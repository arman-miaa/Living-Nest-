import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const Navbar = () => {

    const { name: user } = useAuth();
    // console.log(user);
    const links = (
      <>
        <li>
          <NavLink>Home</NavLink>
        </li>
        <li>
          <NavLink>Apartment</NavLink>
        </li>
        <li>
          <NavLink>Contact US</NavLink>
        </li>
      </>
    );

    return (
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              className="w-12 h-12 rounded-full object-cover"
              src="/logo.png"
              alt=""
            />
            <a className=" text-xl text-white">LivingNest</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-bold  menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2">
            <button className="btn btn-primary bg-accent text-white hover:bg-primary">
              <NavLink to="/logIn">LogIn</NavLink>
            </button>
            <button className="btn btn-primary bg-accent text-white hover:bg-primary">
              <NavLink to="/signUp">SignUp</NavLink>
            </button>
          </div>
        </div>
      </div>
    );
};

export default Navbar;