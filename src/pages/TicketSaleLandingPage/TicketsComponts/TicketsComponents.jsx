import { useContext } from "react";
import { TicketsDataContext } from "../TicketSaleLandingPage";
import { FiMinus, FiPlus } from "react-icons/fi";



const TicketsComponents = () => {
    const { 
        lowTicketsQuantity, setLowTicketsQuantity,
        fullTicketsQuantity, setFullTicketsQuantity,
        corporateTicketsQuantity, setCorporateTicketsQuantity,
    } = useContext(TicketsDataContext);


    return (
        <div>
            {/* Low and Middle Income Countries____________________________________________ */}
            <div className='sm:flex justify-between pb-5 border-b-1 border-gray-300'>
                <div>
                    <h2 className='text-2xl font-bold pb-1'>Low and Middle Income Countries</h2>
                    <h5 className='font-semibold pb-2'>Attendees from Low and Middle-Income Countries As designated by the World Bank / Participants des pays à revenu faible et intermédiaire, tel que désigné par la Banque mondiale</h5>
                    <p className='text-gray-500'>Sales end on <span className='font-bold text-black'>Oct 22, 2025</span></p>
                </div>
                <div>
                    <h2 className='font-bold pb-1'>US $400.00</h2>
                    <div className="flex items-center justify-between border border-gray-300 rounded-md">
                        <span onClick={() => {
                            if(lowTicketsQuantity > 0){
                                setLowTicketsQuantity(lowTicketsQuantity - 1)
                            }else{
                                return
                            }
                        }} className="px-3 py-2 cursor-pointer">
                            <FiMinus/>
                        </span>
                        <input className="text-center" style={{width: '40px', display: 'flex'}} value={lowTicketsQuantity} type="text" readOnly/>
                        <span onClick={() => {
                            setLowTicketsQuantity(lowTicketsQuantity + 1)
                        }} className="px-3 py-2 cursor-pointer">
                            <FiPlus/>
                        </span>
                        
                    </div>
                </div>
            </div>
            {/* Full Conference Registration____________________________________________ */}
            <div className='sm:flex justify-between py-5 border-b-1 border-gray-300'>
                <div>
                    <h2 className='text-2xl font-bold pb-1'>Full Conference Registration</h2>
                    <h5 className='font-semibold pb-2'>Full Conference Registration/Inscription Complète </h5>
                    <p className='text-gray-500'>Sales end on <span className='font-bold text-black'>Oct 22, 2025</span></p>
                </div>
                <div>
                    <h2 className='font-bold pb-1'>US $400.00</h2>
                    <div className="flex items-center justify-between border border-gray-300 rounded-md">
                        <span onClick={() => {
                            if(fullTicketsQuantity > 0){
                                setFullTicketsQuantity(fullTicketsQuantity - 1)
                            }else{
                                return
                            }
                        }} className="px-3 py-2 cursor-pointer">
                            <FiMinus/>
                        </span>
                        <input className="text-center" style={{width: '40px', display: 'flex'}} value={fullTicketsQuantity} type="text" readOnly/>
                        <span onClick={() => {
                            setFullTicketsQuantity(fullTicketsQuantity + 1)
                        }} className="px-3 py-2 cursor-pointer">
                            <FiPlus/>
                        </span>
                        
                    </div>
                </div>
            </div>
            {/* Corporate Attendees____________________________________________ */}
            <div className='sm:flex justify-between py-5 border-b-1 border-gray-300'>
                <div>
                    <h2 className='text-2xl font-bold pb-1'>Corporate Attendees</h2>
                    <h5 className='font-semibold pb-2'>Representatives from Corporations, Organizations, and Businesses /Représentants d'entreprises, d'organisations et de sociétés</h5>
                    <p className='text-gray-500'>Sales end on <span className='font-bold text-black'>Oct 22, 2025</span></p>
                </div>
                <div>
                    <h2 className='font-bold pb-1'>US $400.00</h2>
                    <div className="flex items-center justify-between border border-gray-300 rounded-md">
                        <span onClick={() => {
                            if(corporateTicketsQuantity > 0){
                                setCorporateTicketsQuantity(corporateTicketsQuantity - 1)
                            }else{
                                return
                            }
                        }} className="px-3 py-2 cursor-pointer">
                            <FiMinus/>
                        </span>
                        <input className="text-center" style={{width: '40px', display: 'flex'}} value={corporateTicketsQuantity} type="text" readOnly/>
                        <span onClick={() => {
                            setCorporateTicketsQuantity(corporateTicketsQuantity + 1)
                        }} className="px-3 py-2 cursor-pointer">
                            <FiPlus/>
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketsComponents;