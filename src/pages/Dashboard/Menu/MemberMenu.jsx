import { NavLink } from "react-router-dom";

const MemberMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">Member Menu ...</h2>
        <ul>
          <li>
            <NavLink to="/dashboard/memberProfile">My Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/makePayment'>Make Payment</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/paymentHistory'>Payment History</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/memberAnnouncement'>Announcements</NavLink>
          </li>
        </ul>
      </div>
    );
};

export default MemberMenu;