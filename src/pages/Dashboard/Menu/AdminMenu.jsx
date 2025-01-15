import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">Admin Menu ...</h2>
        <ul>
          <li>
            <NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageMember'>Manage Members</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/makeAnnouncement'>Make Announcement</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/agreementRequests'>Agreement Requests</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/manageCoupons'>Manage Coupons</NavLink>
          </li>
        </ul>
      </div>
    );
};

export default AdminMenu;