import { CiCalendarDate } from 'react-icons/ci';
import { LiaMapMarkerAltSolid } from 'react-icons/lia';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { tailwindContainerClasses } from '../../utils/tailwindClasses';
import auth from '../../../firebase.config';

const Dashboard = () => {

    console.log(auth)
    const location = useLocation();
    const path = location.pathname;
    const isAttendees = path.startsWith('/dashboard/') && !path.includes('/purcher');
    const isPurcher = path.includes('/dashboard/purcher');

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
                            <p className='text-white text-sm'>Québec, Quebec - Canada</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tickets buy Steps_______________________________________________________ */}
            {/* ________________________________________________________________________ */}
            <div style={{marginTop: '-48px'}} className={tailwindContainerClasses}>
                <div className='bg-white mb-4 rounded-lg p-4'>
                    <h2 className='font-bold text-xl pb-3'>Dashboard</h2>
                    <nav className='flex items-center gap-4'>
                        <NavLink to="/dashboard/1/10" className={isAttendees ? 'active' : ''}>Attendees</NavLink>
                        <NavLink to="/dashboard/purcher/1/10" className={isPurcher ? 'active' : ''}>Purcher</NavLink>
                    </nav>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;