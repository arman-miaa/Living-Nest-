import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import userImg from '../../src/assets/user-icon.jpg'
import Button from "../Shared/Button";


const Navbar = () => {

  const { user, logOutUser } = useAuth();
  
    
    const links = (
      <>
        <li className="hover:text-[#28ea72f0] hover:underline">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-[#28ea72f0] hover:underline">
          <NavLink to="apartments">Apartments</NavLink>
        </li>
        <li className="hover:text-[#28ea72f0] hover:underline">
          <NavLink to="/contact">Contact US</NavLink>
        </li>
      </>
    );
  
  const handleLogOutUser = () => {
    logOutUser();
  }

    return (
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" ml-1 mr-3 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
              src="/logo.png"
              alt=""
            />
            <a className=" text-lg md:text-xl text-white cursor-pointer hover:text-secondary">LivingNest</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-bold text-white text-lg  menu-horizontal px-1">
            {links}
          </ul>
        </div>
        {user ? (
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={user.photoURL || userImg}
                    onError={(e) => (e.target.src = userImg)}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>{user?.displayName}</li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOutUser} className="btn bg-primary">
                    LogOut
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="flex gap-2">
              {/* <button className="btn btn-primary bg-secondary text-white hover:bg-primary">
                <NavLink to="/logIn">LogIn</NavLink>
              </button> */}
              <NavLink to="/logIn">
                <Button styleBtn="LogIn" />
              </NavLink>

              {/* <button className="btn btn-primary bg-secondary text-white hover:bg-primary">
                <NavLink to="/signUp">SignUp</NavLink>
              </button> */}
              <NavLink to="/signUp">
                <Button styleBtn="SignUp" />
              </NavLink>
            </div>
          </div>
        )}
      </div>
    );
};

export default Navbar;