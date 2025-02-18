
import { FaBuilding, FaHome, FaRegCalendarAlt } from "react-icons/fa";
import notFoundImg from "../../../../src/assets/not-found.png";
import useAuth from "../../../Hooks/useAuth";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const UserProfile = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen py-8 ${darkMode ? "bg-dark" : "bg-gray-100 "}`}
    >
      <div
        className={`${
          darkMode ? "bg-[#30363c]" : "bg-white"
        } mx-auto p-8 rounded-xl mt-20 shadow-xl max-w-3xl relative`}
      >
        {/* Cover Image and Profile */}
        <div className="relative mb-16">
          <div
            className={`h-40 bg-gradient-to-r from-primary to-[#1f5b73] rounded-t-lg`}
          >
            <h1 className="text-center text-2xl md:text-3xl text-secondary pt-8">
              Welcome to Your Profile
            </h1>
          </div>
          <img
            src={user.photoURL || notFoundImg}
            onError={(e) => (e.target.src = notFoundImg)}
            alt="User Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover absolute -bottom-14 left-1/2 transform -translate-x-1/2"
          />
        </div>

        {/* User Info */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-accent">{user.displayName}</h2>
          <p className={`${darkMode ? "text-gray-50" : "text-gray-500"}`}>
            {user.email}
          </p>
        </div>

        {/* Agreement Info */}
        <div className="border-t pt-6">
          <h3
            className={`text-xl font-semibold text-gray-700 mb-4 text-center ${
              darkMode ? "text-primary" : ""
            }`}
          >
            Agreement Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaRegCalendarAlt className="text-primary mr-2" />
              <span className={`${darkMode ? "text-gray-300" : ""}`}>
                <strong>Agreement Date:</strong> None
              </span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-primary mr-2" />
              <span className={`${darkMode ? "text-gray-300" : ""}`}>
                <strong>Apartment No:</strong> None
              </span>
            </div>
            <div className="flex items-center">
              <FaBuilding className="text-primary mr-2" />
              <span className={`${darkMode ? "text-gray-300" : ""}`}>
                <strong>Block:</strong> None
              </span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-primary mr-2" />
              <span className={`${darkMode ? "text-gray-300" : ""}`}>
                <strong>Floor No:</strong> None
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
