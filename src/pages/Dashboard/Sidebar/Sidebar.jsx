import { Link, Navigate } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import AdminMenu from "../Menu/AdminMenu";
import MemberMenu from "../Menu/MemberMenu";
import UserMenu from "../Menu/UserMenu";
import Loading from "../../Loading";
import useAuth from "../../../Hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import logo from '/logo.png';
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
    const [role, isLoading] = useRole();
    
    const { logOutUser } = useAuth();

    if(isLoading) <Loading></Loading>



    return (
      <div className="bg-primary relative w-60 min-h-screen">
        <div className="flex items-center bg-[#1f5b73] shadow-xl  gap-2 p-2">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={logo}
            alt=""
          />
          <h2 className="text-white font-semibold">LivingNest - Dashboard</h2>
        </div>
        {role === "admin" && <AdminMenu />}
        {role === "member" && <MemberMenu />}
        {role === "user" && <UserMenu />}
        <hr className=" border-[#1f5b73] border-2 mt-4" />
        <button className="btn bg-[#1f5b73] mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden">
          <Link className="flex items-center gap-2" to="/">
            <FaHome className="text-xl" /> Home
          </Link>
        </button>
        <div>
          <button
            onClick={logOutUser}
            className="btn bg-[#1f5b73] hover:bg-secondary flex justify-start pl-6 text-white border-none w-full absolute shadow-sm bottom-0 mb-4"
          >
            {" "}
            <GrLogout className="text-xl" /> LogOut{" "}
          </button>
        </div>
      </div>
    );
};

export default Sidebar;