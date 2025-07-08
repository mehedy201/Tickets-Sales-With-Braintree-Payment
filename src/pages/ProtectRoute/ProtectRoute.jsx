
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.config';
// import { auth } from '../../Firebase.init';

const ProtectRoute = ({children}) => {
            const [user, loading] = useAuthState(auth);
            const location = useLocation();
            if(loading){
                return <p>Loading................</p>
            }
            if(!user){
                return <Navigate to="/log-in" state={{ from: location }} replace />;
            }
            return children;
};

export default ProtectRoute;