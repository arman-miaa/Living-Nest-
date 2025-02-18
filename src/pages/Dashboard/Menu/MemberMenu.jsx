import { CgProfile } from "react-icons/cg";
import { FaHistory } from "react-icons/fa";
import { MdAnnouncement, MdOutlinePayment } from "react-icons/md";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import notFoundImg from '../../../../src/assets/user-icon.jpg'
import { useTheme } from "../../../Hooks/ThemeProvider ";

const MemberMenu = ({onclose}) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div>
      {/* Profile Section */}
      <div className="flex flex-col items-center w-full text-center mt-4">
        <img
          className="w-16 h-16 rounded-full border-2 border-white shadow-lg mb-3"
          src={user.photoURL || notFoundImg}
          onError={(e) => (e.target.src = notFoundImg)}
          alt="Profile"
        />
        <h4 className="text-lg font-semibold text-white -mt-2">
          {user.displayName}
        </h4>
        <h3 className="text-sm text-gray-300">Member</h3>
      </div>

      {/* Menu Items */}
      <ul className="mt-8">
        <NavLink
          onClick={onclose}
          to="/dashboard/memberProfile"
          className={({ isActive }) =>
            `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
              isActive
                ? "bg-secondary"
                : darkMode
                ? "bg-[#30363c]"
                : "bg-[#1f5b73]"
            }`
          }
        >
          <CgProfile className="text-xl" /> My Profile
        </NavLink>
        <NavLink
          onClick={onclose}
          to="/dashboard/makePayment"
          className={({ isActive }) =>
            `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
              isActive
                ? "bg-secondary"
                : darkMode
                ? "bg-[#30363c]"
                : "bg-[#1f5b73]"
            }`
          }
        >
          <MdOutlinePayment className="text-xl" /> Make Payment
        </NavLink>
        <NavLink
          onClick={onclose}
          to="/dashboard/paymentHistory"
          className={({ isActive }) =>
            `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
              isActive
                ? "bg-secondary"
                : darkMode
                ? "bg-[#30363c]"
                : "bg-[#1f5b73]"
            }`
          }
        >
          <FaHistory className="text-xl" /> Payment History
        </NavLink>
        <NavLink
          onClick={onclose}
          to="/dashboard/memberAnnouncement"
          className={({ isActive }) =>
            `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
              isActive
                ? "bg-secondary"
                : darkMode
                ? "bg-[#30363c]"
                : "bg-[#1f5b73]"
            }`
          }
        >
          <MdAnnouncement className="text-xl" /> Announcements
        </NavLink>
      </ul>
    </div>
  );
};

export default MemberMenu;
