import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return (
      <div>
        <h2 className="text-3xl font-bold text-primary">User Menu ...</h2>
        <ul>
          <li>
            <NavLink>My Profile</NavLink>
          </li>
          <li>
            <NavLink>Announcements</NavLink>
          </li>
        </ul>
      </div>
    );
};

export default UserMenu;