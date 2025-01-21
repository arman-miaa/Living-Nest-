import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const MemberMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">Member Menu ...</h2>
        <ul>
          <li className="btn bg-[#1f5b73] rounded-none mt-4 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden">
            <NavLink className="flex items-center gap-2" to="/dashboard/memberProfile">
              <CgProfile className="text-xl" /> My Profile
            </NavLink>
            {/* <NavLink
              to="/dashboard/memberProfile"
              className={({ isActive }) =>
                `flex items-center gap-2 ${
                  isActive ? "text-blue-500 font-bold" : "text-gray-500"
                }`
              }
            >
              <CgProfile className="text-xl" /> My Profile
            </NavLink> */}
          </li>
          <li className="btn bg-[#1f5b73] rounded-none mt-2 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/makePayment"
            >
              <CgProfile className="text-xl" /> Make Payment
            </NavLink>
          </li>
          <li className="btn bg-[#1f5b73] rounded-none mt-2 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/paymentHistory"
            >
              <CgProfile className="text-xl" /> Payment History
            </NavLink>
          </li>
          <li className="btn bg-[#1f5b73] rounded-none mt-2 hover:bg-secondary flex justify-start pl-6 text-white border-none w-full overflow-hidden">
            <NavLink
              className="flex items-center gap-2"
              to="/dashboard/memberAnnouncement"
            >
              <CgProfile className="text-xl" /> Announcements
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/dashboard/makePayment">Make Payment</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/memberAnnouncement">Announcements</NavLink>
          </li> */}
        </ul>
      </div>
    );
};

export default MemberMenu;