import React, { useContext } from 'react';
import OrderSummaryComponents from '../OrderSummaryComponents/OrderSummaryComponents';
import { useNavigate } from 'react-router-dom';
import { TicketsDataContext } from '../TicketSaleLandingPage';

const PaymentComponent = () => {
    const { 
        steps,setSteps,
    } = useContext(TicketsDataContext);

    const navigate = useNavigate();

    return (
        <>
            <div className='py-4 grid md:grid-cols-3 gap-4'>
                <div className='cols md:col-span-2'>
                    {/* Payment____________________________________________________________ */}
                    <p>Mehedi Payment</p>
                </div>
                {/* Tickets Order summary___________________________________________________ */}
                {/* ________________________________________________________________________ */}
                <div className='relative cols'>
                    <div className='bg-slate-100 p-4 rounded-md sticky top-4 h-[fit-content]'>
                        <OrderSummaryComponents />
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <button
                    onClick={() => {navigate('/attendees-info'); setSteps(steps-1)}}
                    className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition cursor-pointer"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Pay
                </button> 
            </div>
        </>
    );
};

export default PaymentComponent;