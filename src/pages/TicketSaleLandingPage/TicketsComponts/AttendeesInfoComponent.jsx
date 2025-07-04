import React from 'react';
import OrderSummaryComponents from '../OrderSummaryComponents/OrderSummaryComponents';

const AttendeesInfoComponent = () => {
    return (
        <form>
            <div className='py-4 grid md:grid-cols-3 gap-4'>
                {/* Attendees Info Collects_________________________________________________ */}
                {/* ________________________________________________________________________ */}
                <div className='cols md:col-span-2'>
                    <p>Form Input</p>
                </div>
                {/* Tickets Order summary___________________________________________________ */}
                {/* ________________________________________________________________________ */}
                <div className='cols bg-slate-100 p-4 rounded-md'>
                    <OrderSummaryComponents/>
                </div>
            </div>
            <div className='flex justify-end'>
                <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer'>Continue</button> 
            </div>
        </form>
    );
};

export default AttendeesInfoComponent;