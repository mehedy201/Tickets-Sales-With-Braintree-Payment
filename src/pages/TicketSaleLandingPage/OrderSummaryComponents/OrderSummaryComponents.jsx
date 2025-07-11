import { useContext, useEffect, useState } from 'react';
import { TicketsDataContext } from '../TicketSaleLandingPage';
import { IoTicketOutline } from "react-icons/io5";

const OrderSummaryComponents = () => {

    const { 
        steps,
        lowTicketsQuantity, 
        fullTicketsQuantity,
        corporateTicketsQuantity, 
        lowTicketsPrice, 
        fullTicketsPrice, 
        corporateTicketsPrice,
        totalPrice,
        payAblePrice, setPayAblePrice,
        cuponCode, setCuponCode,
    } = useContext(TicketsDataContext);

    const [taxAmount, setTaxAmount] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);

    useEffect( () => {
        let totalWithTaxForDiscountCondition;
        if(totalPrice > 0){
            const taxRate = 0.15; // 15% Vat
            const withTax = totalPrice * taxRate
            setTaxAmount(withTax.toFixed(2))
            totalWithTaxForDiscountCondition = (withTax + totalPrice).toFixed(2);
            setPayAblePrice((totalPrice + withTax).toFixed(2))
            if(lowTicketsQuantity+fullTicketsQuantity+corporateTicketsQuantity === 1){
                setDiscountAmount(0)
                setPayAblePrice((totalPrice + withTax).toFixed(2))
            }
        }
        if(lowTicketsQuantity+fullTicketsQuantity+corporateTicketsQuantity > 1){
            const discountRate = 0.10; // 10% Discount
            const discountPrice = (totalWithTaxForDiscountCondition * discountRate).toFixed(2);
            setDiscountAmount(discountPrice)
            setPayAblePrice((totalWithTaxForDiscountCondition - discountPrice).toFixed(2))
        }
        

    },[lowTicketsQuantity, fullTicketsQuantity, corporateTicketsQuantity])

    const [cuponErr, setCuponErr] = useState('');
    const [isCuponCodeTrue, setIsCuponCodeTrue] = useState(false)
    const [cuponDiscountAmount, setCuponDiscountAmount] = useState('')
    const cuponCodeHandle = () => {
        setCuponErr('')
        setIsCuponCodeTrue(false)
        if(payAblePrice > 0){
            if(cuponCode){
                if(cuponCode === 'Mehedi'){
                    setCuponDiscountAmount(300)
                    const afterCupon = payAblePrice - 300
                    setPayAblePrice(afterCupon)
                    setIsCuponCodeTrue(true)
                }else{
                    setCuponErr('Cupon code not match')
                }
            }else{
                setCuponErr('Please type cupon code')
            }
        }else{
            setCuponErr('Please select Ticket')
        }
    }


    return (
        <>
            <div className='pb-4'>
                {
                    steps === 3 &&
                    <>
                        <p className='text-xl pb-2'>Promotional Code</p>
                        <div className='flex justify-between items-center'>
                            <input type="text" onChange={(e) => setCuponCode(e.target.value)} className='focus:outline-none focus:ring-0 border border-gray-300 w-full h-9 rounded-tl-md rounded-bl-md px-2'/>
                            <span onClick={cuponCodeHandle} className='flex items-center font-bold text-white px-3 bg-blue-500 h-9 cursor-pointer rounded-tr-md rounded-br-md'>Apply</span>
                        </div>
                    </>
                }
                {
                    cuponErr && <p className='text-red-500'>{cuponErr}</p>
                }
                {
                    isCuponCodeTrue === true &&
                    <p className='flex items-center gap-2 py-2'><span className='text-green-500 font-semibold'>{cuponCode}</span><span className='text-xs bg-gray-200 px-2 py-1 rounded-md'>Applied</span></p>
                }
            </div>
            {
                lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity > 0 &&
                <div className='flex justify-between items-center py-2 border-b-1 border-gray-300'>
                    <p className='font-semibold text-md pb-2'>Ticket Details</p>
                    <p className='font-semibold text-md pb-2'>Price</p>
                </div>
            }
            {
                lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity == 0 &&
                <div className='flex flex-col justify-center items-center gap-5 py-10'>
                    <IoTicketOutline size={64}/>
                    <p>Please choose a ticket class to continue</p>
                </div>
            }
            {
                lowTicketsQuantity > 0 &&
                <div className='flex justify-between py-2'>
                    <div>
                        <h5 className='font-bold text-[12px] sm:text-[14px]'>Low and Middle Income Countries</h5>
                        <span className='font-bold text-[12px] sm:text-[14px]'>{lowTicketsQuantity} x US$440.00</span>
                    </div>
                    <p className='font-bold text-[14px] sm:text-[16px]'>US${lowTicketsPrice}.00</p>
                </div>
            }
            {
                fullTicketsQuantity > 0 &&
                <div className='flex justify-between py-2'>
                    <div>
                        <h5 className='font-bold text-[12px] sm:text-[14px]'>Full Conference Registration</h5>
                        <span className='font-bold text-[12px] sm:text-[14px]'>{fullTicketsQuantity} x US$500.00</span>
                    </div>
                    <p className='font-bold text-[14px] sm:text-[16px]'>US${fullTicketsPrice}.00</p>
                </div>
            }
            {
                corporateTicketsQuantity > 0 &&
                <div className='flex justify-between py-2'>
                    <div>
                        <h5 className='font-bold text-[12px] sm:text-[14px]'>Corporate Attendees</h5>
                        <span className='font-bold text-[12px] sm:text-[14px]'>{corporateTicketsQuantity} x US$550.00</span>
                    </div>
                    <p className='font-bold text-[14px] sm:text-[16px]'>US${corporateTicketsPrice}.00</p>
                </div>
            }
            {
                totalPrice > 0 &&
                <div className='pt-4 border-t-1 border-gray-300'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <p className='font-semibold'>Actual Amount</p>
                            <p className='text-sm'>{lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity} Tickets</p>
                        </div>
                        <p className='font-bold '>US${totalPrice}.00</p>
                    </div>
                    <div className='flex flex-col gap-3 pt-3'>
                        <div className='flex items-center justify-between'>
                            <p className=''>Harmonized Sales Tax (HST) (15%)</p>
                            <p className=''>$ {taxAmount}</p>                       
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className=''>Group Discount (10%)</p>
                            <p className=''>$ {discountAmount}</p>
                        </div>
                        {
                            cuponDiscountAmount &&
                            <div className='flex items-center justify-between'>
                                <p className=''>Cupon Discount</p>
                                <p className=''>$ {cuponDiscountAmount}</p>
                            </div>
                        }
                        <div className='flex items-center justify-between border-t-1 border-gray-300 pt-2'>
                            <p className='font-semibold'>Sub Total</p>
                            <p className='font-semibold'>US$ {payAblePrice}</p>
                        </div>

                    </div>


                    <p className='pt-3'><span className='font-bold'>*No cancellation policy:</span> Order cancellation not allowed.</p>
                </div>
            }
        </>
    );
};

export default OrderSummaryComponents;