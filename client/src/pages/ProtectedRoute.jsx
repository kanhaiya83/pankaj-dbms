
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
// import Loading from '../components/Loading'
const ProtectedRoute = ({ children }) => {
  const { user,isAuthenticated } = useAppContext();
  
  if(!isAuthenticated || !user){
   return <Navigate to={"/auth"} />
  }

  return children;
};

export default ProtectedRoute