import { Helmet } from "react-helmet";
import useRole from "../../../Hooks/useRole";
import Loading from "../../Loading";
import { Navigate } from "react-router-dom";


const Statistics = () => {
    const [role, isLoading] = useRole();
    if (isLoading) return <Loading />
    

    if(role === 'admin') return <Navigate to='/dashboard/adminProfile'></Navigate>
    if(role === 'member') return <Navigate to='/dashboard/memberProfile'></Navigate>
    if(role === 'user') return <Navigate to='/dashboard/userProfile'></Navigate>

    return (
        <div>
            <Helmet>
                <title>Dashboard | LivingNest</title>
            </Helmet>
        </div>
    );
};

export default Statistics;