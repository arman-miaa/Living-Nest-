import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";

const MemberRoute = ({children}) => {
    const [role, isLoading] = useRole();

    if (isLoading) <p>loading.....</p>
    if (role === 'member') return children;


    return <Navigate to='/dashboard' relative="true"></Navigate>
};

export default MemberRoute;