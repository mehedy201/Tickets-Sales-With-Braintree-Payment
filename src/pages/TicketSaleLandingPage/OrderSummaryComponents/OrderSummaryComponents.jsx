import { useContext } from 'react';
import { TicketsDataContext } from '../TicketSaleLandingPage';
import { IoTicketOutline } from "react-icons/io5";

const OrderSummaryComponents = () => {

    const { 
        lowTicketsQuantity, 
        fullTicketsQuantity,
        corporateTicketsQuantity, 
        lowTicketsPrice, 
        fullTicketsPrice, 
        corporateTicketsPrice,
        totalPrice,
    } = useContext(TicketsDataContext);


    return (
        <>
            <h4 className='font-semibold text-md border-b-1 pb-2 border-gray-300'>Your Order</h4>
            {
                lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity > 0 &&
                <div className='flex justify-between items-center py-2 border-b-1 border-gray-300'>
                    <p className='text-sm font-semibold'>Ticket Details</p>
                    <p className='text-sm font-semibold'>Price</p>
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
                <div className='pt-3 border-t-1 border-gray-300'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='font-semibold'>Actual Amount</p>
                            <p className='text-sm'>{lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity} Tickets</p>
                        </div>
                        <p className='font-bold '>US${totalPrice}.00</p>
                    </div>
                    <p className='pt-3'><span className='font-bold'>*No cancellation policy:</span> Order cancellation not allowed.</p>
                </div>
            }
        </>
    );
};

export default OrderSummaryComponents;