import { useContext, useEffect, useRef, useState } from 'react';
import OrderSummaryComponents from '../OrderSummaryComponents/OrderSummaryComponents';
import { useNavigate } from 'react-router-dom';
import { TicketsDataContext } from '../TicketSaleLandingPage';
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

const PaymentComponent = () => {
    const { 
        steps,setSteps,
        payAblePrice,
        cuponCode,
        clientToken, setClientToken,
        lowTicketsQuantity,
        fullTicketsQuantity,
        corporateTicketsQuantity,
    } = useContext(TicketsDataContext);
    const navigate = useNavigate();


    const dropinInstance = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(!clientToken){
            console.log('Dont have client')
            const getClientToken = async () => {
            const res = await axios.get('http://localhost:5000/client-token');
            setClientToken(res.data.clientToken);
            };
            getClientToken();
        }
    }, []);

    useEffect(() => {
        if (clientToken) {
        dropin.create({
            authorization: clientToken,
            container: '#dropin-container',
            threeDSecure: true,
        }, (err, instance) => {
            if (err) return console.error(err);
            dropinInstance.current = instance;
        });
        }
    }, [clientToken]);

    const handlePayment = async () => {
        setLoading(true);
        setMessage('');
        if (!dropinInstance.current) return;

        try {
        const { nonce } = await dropinInstance.current.requestPaymentMethod({
            threeDSecure: {
                amount: payAblePrice // Dummy amount; real amount is calculated server-side
            },
        });

        const response = await axios.post('http://localhost:5000/checkout', {
            nonce,
            lowTicketsQuantity,
            fullTicketsQuantity,
            corporateTicketsQuantity,
            cuponCode,
        });

        if (response.data.success) {
            const summary = response.data.summary;
            console.log("Response", response)
            setMessage(
            `✅ Payment Success.\nPaid: ৳${summary.finalAmount}\nTransaction ID: ${response.data.transaction.id}`
            );
            setLoading(false)
        } else {
            setMessage(`❌ Payment failed: ${response.data.message}`);
            setLoading(false)
        }
        } catch (err) {
            setMessage('❌ Payment error occurred.');
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className='py-4 grid md:grid-cols-3 gap-4'>
                <div className='cols md:col-span-2'>
                    {/* Payment____________________________________________________________ */}
                    <OrderSummaryComponents />
                    
                </div>
                {/* Tickets Order summary___________________________________________________ */}
                {/* ________________________________________________________________________ */}
                <div className='relative cols'>
                    <div className='bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]'>
                        {/* <OrderSummaryComponents /> */}
                        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow">
                            <h2 className="text-xl font-semibold mb-2">Secure Payment</h2>
                            <div id="dropin-container" className="mb-4 border-none shadow"></div>
                            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <span
                    onClick={() => {navigate('/attendees-info'); setSteps(steps-1)}}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
                >
                    Previous
                </span>
                {/* <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Pay
                </button>  */}
                <span
                    
                    onClick={handlePayment}
                    disabled={loading || !dropinInstance.current}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Processing...' : `Pay`}
                </span>
            </div>
        </>
    );
};

export default PaymentComponent;