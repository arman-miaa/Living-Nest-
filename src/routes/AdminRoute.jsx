import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Loading from "../pages/Loading";

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();
   
  if (isLoading) return <Loading />;
    if (role === "admin") return children;
    
  return <Navigate to="/dashboard" replace="true" />;

  
};

export default AdminRoute;