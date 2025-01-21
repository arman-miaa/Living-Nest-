import { CgProfile } from "react-icons/cg";
import { CiSquareQuestion } from "react-icons/ci";
import { MdAnnouncement, MdGroups } from "react-icons/md";
import { SiManageiq } from "react-icons/si";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import notFoundImg from '../../../../src/assets/user-icon.jpg'

const AdminMenu = () => {
  const { user } = useAuth();
    return (
      <div>
           {/* Profile Section */}
            <div className="flex flex-col items-center w-full text-center mt-4">
              <img
                className="w-16 h-16 rounded-full border-2 border-white shadow-lg mb-3"
                src={user.photoURL || notFoundImg}
                onError={(e) => e.target.src=notFoundImg}
                alt="Profile"
              />
              <h4 className="text-lg font-semibold text-white -mt-2">{user.displayName}</h4>
              <h3 className="text-sm text-gray-300">Admin</h3>
            </div>
        <ul>
          <NavLink
            to="/dashboard/adminProfile"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <CgProfile className="text-xl" /> Admin Profile
          </NavLink>

          <NavLink
            to="/dashboard/manageMember"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <MdGroups className="text-xl" /> Manage Members
          </NavLink>
          <NavLink
            to="/dashboard/makeAnnouncement"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <MdAnnouncement className="text-xl" /> Make Announcement
          </NavLink>
          <NavLink
            to="/dashboard/agreementRequests"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <CiSquareQuestion className="text-xl" /> Agreement Requests
          </NavLink>
          <NavLink
            to="/dashboard/manageCoupons"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <SiManageiq className="text-xl" /> Manage Coupons
          </NavLink>
        </ul>
      </div>
    );
};

export default AdminMenu;