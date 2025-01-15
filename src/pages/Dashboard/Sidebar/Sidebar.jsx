import { Link, Navigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import AdminMenu from "../Menu/AdminMenu";
import MemberMenu from "../Menu/MemberMenu";
import UserMenu from "../Menu/UserMenu";


const Sidebar = () => {
    const [role, isLoading] = useRole();
    console.log(role);



    return (
        <div className="bg-secondary w-60 min-h-screen">
            LivingNest Dashboard

            {role === 'admin' && <AdminMenu />}
            {role === 'member' && <MemberMenu />}
            {role === 'user' && <UserMenu />}
            <hr />

            <button className="btn btn-primary  mt-4 w-full overflow-hidden"><Link to='/'>Home</Link></button>
            
        </div>
    );
};

export default Sidebar;