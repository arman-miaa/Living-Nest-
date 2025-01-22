import { Link } from "react-router-dom";
import useRole from "../../../Hooks/useRole";
import AdminMenu from "../Menu/AdminMenu";
import MemberMenu from "../Menu/MemberMenu";
import UserMenu from "../Menu/UserMenu";
import Loading from "../../Loading";
import useAuth from "../../../Hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { FaBars, FaTimes, FaHome } from "react-icons/fa"; 
import logo from "/logo.png";
import { useState } from "react";

const Sidebar = () => {
  const [role, isLoading] = useRole();
  const { logOutUser } = useAuth();
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  if (isLoading) return <Loading />;

 
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        className="md:hidden p-4 text-2xl bg-[#1f5b73] text-white fixed top-2 right-2 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-primary ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform transition-transform duration-300 flex flex-col fixed bottom-0 left-0 top-0 w-60 min-h-screen z-50`}
      >
        <div className="flex items-center bg-[#1f5b73] shadow-xl gap-2 p-2">
          <img
            className="w-10 h-10 rounded-full cursor-pointer"
            src={logo}
            alt=""
          />
          <h2 className="text-white font-semibold">LivingNest - Dashboard</h2>
        </div>

        {role === "admin" && <AdminMenu onclose={toggleSidebar} />}
        {role === "member" && <MemberMenu onclose={toggleSidebar} />}
        {role === "user" && <UserMenu onclose={toggleSidebar} />}

        <hr className="border-[#1f5b73] border-2 mt-4" />

        <Link
          to="/"
          className="btn bg-[#1f5b73] mt-4 rounded-none hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden"
        >
          <FaHome className="text-xl" /> Home
        </Link>

        <div>
          <button
            onClick={logOutUser}
            className="btn bg-[#1f5b73] hover:bg-secondary rounded-none flex justify-start pl-6 text-white border-none w-full absolute shadow-sm bottom-0 mb-4"
          >
            <GrLogout className="text-xl" /> LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
