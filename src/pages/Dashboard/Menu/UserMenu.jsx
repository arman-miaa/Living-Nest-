import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import notFoundImg from '../../../../src/assets/user-icon.jpg';

const UserMenu = () => {
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
                <h3 className="text-sm text-gray-300">User</h3>
              </div>
        <ul>
          {/* <li>
            <NavLink to="/dashboard/userProfile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/userAnouncements">Announcements</NavLink>
          </li> */}
          <NavLink
            to="/dashboard/userProfile"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <CgProfile className="text-xl" /> My Profile
          </NavLink>
          <NavLink
            to="/dashboard/userAnouncements"
            className={({ isActive }) =>
              `btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden ${
                isActive ? "bg-secondary" : ""
              }`
            }
          >
            <CgProfile className="text-xl" /> Announcements
          </NavLink>
        </ul>
      </div>
    );
};

export default UserMenu;