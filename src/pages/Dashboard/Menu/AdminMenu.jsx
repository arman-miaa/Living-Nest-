import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">Admin Menu ...</h2>
        <ul>
          <li>
            <NavLink>Admin Profile</NavLink>
          </li>
          <li>
            <NavLink>Manage Members</NavLink>
          </li>
          <li>
            <NavLink>Make Announcement</NavLink>
          </li>
          <li>
            <NavLink>Agreement Requests</NavLink>
          </li>
          <li>
            <NavLink>Manage Coupons</NavLink>
          </li>
        </ul>
      </div>
    );
};

export default AdminMenu;