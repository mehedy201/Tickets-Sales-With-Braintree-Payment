import React from 'react';
import { tailwindContainerClasses } from '../../utils/tailwindClasses';

const TicketSaleLandingPage = () => {
    return (
        <div>
            <div className={tailwindContainerClasses}>
                <div className='bg-red-100 h-screen flex items-center justify-center'>
                    <h1 className='text-3xl font-bold underline'>Ticket Sell Landing Page</h1>
                </div>
            </div>
        </div>
    );
};

export default TicketSaleLandingPage;