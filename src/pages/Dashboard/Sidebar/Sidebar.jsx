import { Link, Navigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import AdminMenu from "../Menu/AdminMenu";
import MemberMenu from "../Menu/MemberMenu";
import UserMenu from "../Menu/UserMenu";
import Loading from "../../Loading";
import useAuth from "../../../Hooks/useAuth";


const Sidebar = () => {
    const [role, isLoading] = useRole();
    
    const { logOutUser } = useAuth();

    if(isLoading) <Loading></Loading>



    return (
        <div className="bg-secondary relative w-60 min-h-screen">
            LivingNest Dashboard

            {role === 'admin' && <AdminMenu />}
            {role === 'member' && <MemberMenu />}
            {role === 'user' && <UserMenu />}
            <hr />

            <button className="btn btn-primary  mt-4 w-full overflow-hidden"><Link to='/'>Home</Link></button>

            <div>
                <button onClick={logOutUser} className="btn btn-primary w-full absolute bottom-0 mb-4">  LogOut  </button>
            </div>
            
        </div>
    );
};

export default Sidebar;