import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole();
    // console.log(role);
    if (isLoading) return <p>loading.....</p>
    if (role === "admin") return children;
    
  return <Navigate to="/dashboard" replace="true" />;

  
};

export default AdminRoute;