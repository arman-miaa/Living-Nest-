import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import userImg from "../../src/assets/user-icon.jpg";
import Button from "../Shared/Button";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { toast } from "react-toastify";
import { useTheme } from "../Hooks/ThemeProvider ";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
  const { user, logOutUser } = useAuth() || {}; 
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleLogOutUser = () => {
    if (logOutUser) logOutUser(); 
    toast.success('logged out successfully')
   
  };

  const links = (
    <>
      <li className="hover:text-[#28ea72f0] hover:underline">
        <NavLink to="/" onClick={toggleSidebar}>
          Home
        </NavLink>
      </li>
      <li className="hover:text-[#28ea72f0] hover:underline">
        <NavLink to="/apartments" onClick={toggleSidebar}>
          Apartments
        </NavLink>
      </li>
      <li className="hover:text-[#28ea72f0] hover:underline">
        <NavLink to="/contact" onClick={toggleSidebar}>
          Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="relative">
      {/* Navbar */}
      <div className="navbar container mx-auto  text-white">
        <div className="navbar-start">
          <button className="lg:hidden p-2 text-2xl" onClick={toggleSidebar}>
            {isSidebarOpen ? "" : <FaBars />}
          </button>
          <div className="flex items-center gap-2">
            <img
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
              src="/logo.png"
              alt="LivingNest Logo"
            />
            <a className="text-lg md:text-xl cursor-pointer hover:text-secondary">
              LivingNest
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu font-bold text-white text-lg menu-horizontal px-1">
            {links}
          </ul>
        </div>
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={` ${user ? 'ml-10' : ''} ml-6 px-2 capitalize flex justify-center items-center gap-0 md:gap-2`}
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6   md:h-8 md:w-8 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6   md:h-8 md:w-8" />
          )}
        </button>
        {user ? (
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 lg:w-12 rounded-full border-2 shadow-2xl">
                  <img
                    alt="User Avatar"
                    src={user?.photoURL || userImg}
                    onError={(e) => (e.target.src = userImg)}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-36 p-2 shadow"
              >
                <li className="text-xl font-semibold text-accent text-center mb-1">
                  {user?.displayName || "User"}
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="btn border-secondary hover:bg-secondary hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOutUser}
                    className="btn mt-2 border-secondary hover:bg-secondary hover:text-white"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <div className="flex gap-2">
              <NavLink to="/logIn">
                <Button styleBtn="LogIn" />
              </NavLink>
              <NavLink to="/signUp">
                <Button styleBtn="SignUp" />
              </NavLink>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full lg:hidden w-60 ${
          darkMode ? "bg-dark" : "bg-primary"
        } text-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div
          className={`p-4 flex items-center gap-2 ${
            darkMode ? "bg-[#30363c]" : "bg-[#143847]"
          }`}
        >
          <img
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
            src="/logo.png"
            alt="LivingNest Logo"
          />
          <div className="flex items-center gap-6">
            <h2 className="text-lg md:text-xl font-semibold">LivingNest </h2>
            <button
              onClick={toggleSidebar}
              className="bg-primary text-2xl rounded-full"
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <ul className="menu p-4">{links}</ul>
        {user && (
          <div className="absolute bottom-4 w-full px-4">
            <button
              onClick={() => {
                handleLogOutUser();
                toggleSidebar();
              }}
              className={`btn bg-[#1f5b73]  ${
                darkMode ? "bg-[#30363c]" : "bg-[#1f5b73]"
              } text-lg hover:bg-secondary text-white w-full`}
            >
              <GrLogout /> Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
