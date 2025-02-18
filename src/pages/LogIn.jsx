import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import lottieLogin from "../../src/assets/lottie/login.json";
import Lottie from "lottie-react";
import useAuth from "../Hooks/useAuth";

import { saveUser } from "../api/userApi";
import Button from "../Shared/Button";
import { useTheme } from "../Hooks/ThemeProvider ";

const Login = () => {
  const { signInUser, signInWithGoogle, setUser } = useAuth();
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        setUser(result.user);
        saveUser(result.user)
        toast.success("Logged in successfully!");
       
       
        form.reset();
        setError("");

        // navigate(from);
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Invalid email or password. Please try again!");
        setError("Invalid email or password. Please try again!");
      });
  };

  const handleSignInUserWithGoogle = () => {
    signInWithGoogle().then((result) => {
      toast.success("Login successful With Google!");
   
     
      const user = result.user;
      saveUser(user)
      navigate(from, { replace: true });
      // navigate(from);
    });
  };

  return (
    <div className="mt-12 flex items-center justify-between gap-8 flex-col-reverse md:flex-row">
      <div
        className={`hero  flex-1 ${
          darkMode ? "" : ""
        } flex justify-center items-center`}
        // style={{ backgroundColor: "#1D1D1D" }}
      >
        <Helmet>
          <title>Login Page || LivingNest</title>
        </Helmet>
        <div
          className={` shadow-xl mx-4 md:mx-0  p-4 rounded-xl ${
            darkMode ? " border-emerald-800 border-2" : "bg-base-200"
          }`}
        >
          {/* Header Section */}
          <div className="text-center">
            <h1
              className={` text-2xl mt-4 md:text-3xl lg:text-5xl font-bold mb-4 text-secondary ${
                darkMode ? "" : ""
              }`}
            >
              Welcome Back!
            </h1>
            <p
              className={`text-lg w-4/5 mx-auto ${
                darkMode ? "text-gray-400" : "text-black"
              }`}
            >
              Log in to explore available apartments, manage your rental
              agreements, and stay updated on the latest listings.
            </p>
          </div>

          {/* Login Form */}
          <div className="card  rounded-lg">
            <form onSubmit={handleSubmit} className="card-body ">
              {/* Email Input */}
              <div className="form-control ">
                <label className="label">
                  <span
                    className={`label-text font-semibold ${
                      darkMode ? "text-gray-400" : "text-black"
                    }`}
                  >
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={`input  border-accent bg-transparent input-bordered focus:outline-none focus:ring-2 ${
                    darkMode ? "text-gray-400" : "text-black"
                  }`}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control mt-4">
                <label className="label">
                  <span
                    className={`label-text font-semibold ${
                      darkMode ? "text-gray-400" : "text-black"
                    }`}
                  >
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className={`input  border-accent bg-transparent input-bordered focus:outline-none focus:ring-2 ${
                    darkMode ? "text-gray-400" : "text-black"
                  }`}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {/* Login Button */}
              <div className="form-control mt-6">
                {/* <button
                  type="submit"
                  className="btn bg-emerald-700 text-white border-none hover:bg-emerald-800"
                >
                  Login
                </button> */}
                <Button styleBtn={`LogIn`}/>
              </div>

              {/* Google Login */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleSignInUserWithGoogle}
                  className={`relative  py-2 px-4  bg-transparent isolation-auto z-10 border-2 border-accent before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-orange-500 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center text-sm font-semibold ${
                    darkMode ? "text-white" : "text-black"
                  }   rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none`}
                >
                  Login with Google
                </button>
              </div>

              {/* Register Link */}
              <p
                className={`label-text font-semibold text-center mt-4 ${
                  darkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold underline text-secondary"
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <Lottie animationData={lottieLogin} />
      </div>
    </div>
  );
};

export default Login;
