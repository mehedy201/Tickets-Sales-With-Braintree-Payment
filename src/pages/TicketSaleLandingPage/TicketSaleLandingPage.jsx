import { tailwindContainerClasses } from '../../utils/tailwindClasses';
import { CiCalendarDate } from "react-icons/ci";
import { LiaMapMarkerAltSolid } from "react-icons/lia";
import { IoIosCheckmarkCircle, IoIosArrowForward, IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoTicketOutline } from "react-icons/io5";
import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const TicketsDataContext = createContext();


const TicketSaleLandingPage = () => {

    const navigate = useNavigate();
    const [steps, setSteps] = useState(1)
    // Quantity ________________________________________
    const [lowTicketsQuantity, setLowTicketsQuantity] = useState(0)
    const [fullTicketsQuantity, setFullTicketsQuantity] = useState(0)
    const [corporateTicketsQuantity, setCorporateTicketsQuantity] = useState(0)
    // Price ___________________________________________
    const [lowTicketsPrice, setLowTicketsPrice] = useState(0)
    const [fullTicketsPrice, setFullTicketsPrice] = useState(0)
    const [corporateTicketsPrice, setCorporateTicketsPrice] = useState(0)
    const [totalPrice, setTotalParice] = useState(0);
    // Purcher and Attendees Info Collect ______________
    const [purcherInfo, setPurcherInfo] = useState();
    const [attendeesInfo, setAttendeesInfo] = useState();
    const [paymentInfo, setPaymentInfo] = useState();

    const contextValue = {
        setSteps,
        // Quantity ________________________________________
        lowTicketsQuantity, setLowTicketsQuantity,
        fullTicketsQuantity, setFullTicketsQuantity,
        corporateTicketsQuantity, setCorporateTicketsQuantity,
        // Price ___________________________________________
        lowTicketsPrice, setLowTicketsPrice,
        fullTicketsPrice, setFullTicketsPrice,
        corporateTicketsPrice, setCorporateTicketsPrice,
        totalPrice, setTotalParice,
        // Purcher and Attendees Info Collect ______________
        purcherInfo, setPurcherInfo,
        attendeesInfo, setAttendeesInfo,
        paymentInfo, setPaymentInfo
    }


    return (
        <div>
            {/* Events Tittle_______________________________________________________ */}
            {/* ________________________________________________________________________ */}
            <div className='bg-blue-500 pt-20 pb-20'>
                <div className={tailwindContainerClasses}>
                    <h1 className='text-[30px] md:text-[40px] font-bold text-white'>International Conference on Global Health and Climate</h1>
                    <div className='flex items-center gap-6 pt-3'>
                        <div className='flex items-center gap-1'>
                            <CiCalendarDate size={18} color="white"/>
                            <p className='text-white text-sm'>Oct 19 to 22, 2025</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <LiaMapMarkerAltSolid size={18} color="white"/>
                            <p className='text-white text-sm'>Oct 19 to 22, 2025</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tickets buy Steps_______________________________________________________ */}
            {/* ________________________________________________________________________ */}
            <div style={{marginTop: '-48px'}} className={tailwindContainerClasses}>
                <div className='px-2 sm:px-10 pt-4 pb-10 bg-white shadow-md border-1 border-gray-300 rounded-lg'>
                    <div className='flex items-center gap 1 sm:gap-3 md:gap-3 pb-3 border-b-1 border-gray-300'>
                        <div className='flex items-center gap-1'>
                            <IoIosCheckmarkCircle className='hidden sm:block'/>
                            <small className='text-xm sm:text-sm'>Select Tickets</small>
                            <IoIosArrowForward className='sm:ml-2'/>
                        </div>
                        <div className='flex items-center gap-1'>
                            {
                                steps > 1 ? <IoIosCheckmarkCircle className='hidden sm:block'/> : <IoIosCheckmarkCircleOutline className='hidden sm:block'/>
                            }
                            <small>Share Details</small>
                            <IoIosArrowForward className='sm:ml-2'/>
                        </div>
                        <div className='flex items-center gap-1'>
                            {
                                steps > 2 ? <IoIosCheckmarkCircle className='hidden sm:block'/> : <IoIosCheckmarkCircleOutline className='hidden sm:block'/>
                            }
                            <small>Complete Payment</small>
                        </div>
                    </div>

                    {/* Tickets Order summary___________________________________________________ */}
                    {/* ________________________________________________________________________ */}
                    <div className='py-4 grid md:grid-cols-3 gap-4'>
                        <div className='cols md:col-span-2'>
                            <TicketsDataContext.Provider value={contextValue}>
                                <Outlet/>
                            </TicketsDataContext.Provider>
                        </div>
                        <div className='cols bg-slate-100 p-4 rounded-md'>
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
                        </div>
                    </div>
                    {/* Continue button press to got next step ___________________________________________ */}
                    {/* __________________________________________________________________________________ */}
                    <div className='flex justify-end'>
                        {
                            lowTicketsQuantity + fullTicketsQuantity + corporateTicketsQuantity > 0 ? <button 
                            onClick={() => navigate('/attendees-info')}
                            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer'>Continue</button> : <button className='bg-blue-300 text-white font-bold py-2 px-4 rounded-lg'>Continue</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketSaleLandingPage;