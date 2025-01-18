import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";
import Loading from "../pages/Loading";

const MemberRoute = ({children}) => {
    const [role, isLoading] = useRole();

    if (isLoading) return <Loading/>
    if (role === 'member') return children;


    return <Navigate to='/dashboard' relative="true"></Navigate>
};

export default MemberRoute;