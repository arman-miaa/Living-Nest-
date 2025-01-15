import { NavLink } from "react-router-dom";

const MemberMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">Member Menu ...</h2>
        <ul>
          <li>
            <NavLink>My Profile</NavLink>
          </li>
          <li>
            <NavLink>Make Payment</NavLink>
          </li>
          <li>
            <NavLink>Payment History</NavLink>
          </li>
          <li>
            <NavLink>Announcements</NavLink>
          </li>
        </ul>
      </div>
    );
};

export default MemberMenu;