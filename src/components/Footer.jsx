import { Link } from "react-router-dom";
import Button from "../Shared/Button";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const handleSubscribe = () => {
    toast.success('Thank You for subscribe US!')
  }
    return (
      <div className="mt-12 lg:mt-20">
        <div className="footer bg-primary text-white  p-10">
          <footer className="flex justify-between flex-col lg:flex-row container mx-auto ">
            <nav className=" flex flex-col items-center mx-auto lg:mx-0">
              <img
                src="/logo.png"
                alt="logo"
                className="w-20 h-20 rounded-full"
              />
              <h2 className="text-xl font-semibold text-center mt-2 mb-2">
                LivingNest - Building <br /> Management System (BMS){" "}
              </h2>
              <p>
                "LivingNest" simplifies building management <br /> with
                innovation and ease, ensuring streamlined <br />
                operations and modern living convenience.
              </p>
            </nav>
            <nav className="text-lg mx-auto lg:mx-0 flex flex-col mt-4 lg:mt-0">
              <h6 className="footer-title text-black">Company</h6>
              <ul>
                <li className="link link-hover hover:text-[#28ea72f0]">
                  <Link to="/">Home</Link>
                </li>
                <li className="link link-hover hover:text-[#28ea72f0]">
                  <Link to="/apartments">Apartments</Link>
                </li>
                <li className="link link-hover hover:text-[#28ea72f0]">
                  <Link to="/contact">Contact US</Link>
                </li>
                <li className="link link-hover hover:text-[#28ea72f0]">
                  <Link to="/signUp">Register</Link>
                </li>
                <li className="link link-hover hover:text-[#28ea72f0]">
                  <Link to="/logIn">Login</Link>
                </li>
              </ul>
            </nav>

            <form className="mx-auto  lg:mx-0 text-center lg:text-left mt-4 lg:mt-0">
              <h6 className="footer-title text-black text-lg">Newsletter</h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="label-text text-white">
                    Enter your email address
                  </span>
                </label>
                <div>
                  <div className="join pr-4 md:pr-0 ">
                    <input
                      type="email"
                      placeholder="username@site.com"
                      className="input input-bordered join-item w-48 md:w-auto h-11   text-gray-400"
                    />
                    <div onClick={handleSubscribe} className=" ">
                      <Button styleBtn={`Subscribe`} />
                    </div>
                  </div>
                  <div className="flex mt-4 gap-4">
                    <a
                      href="https://www.facebook.com/arman2mia"
                      target="_blank"
                      className="text-blue-800 text-4xl"
                    >
                      <FaFacebook></FaFacebook>{" "}
                    </a>
                    <a
                      href="https://x.com/arman_miaa"
                      target="_blank"
                      className="text-gray-600 text-4xl"
                    >
                      <FaTwitter></FaTwitter>{" "}
                    </a>
                    <a
                      href="https://www.instagram.com/arman_mia36/"
                      target="_blank"
                      className="text-pink-600 text-4xl"
                    >
                      <FaInstagram></FaInstagram>{" "}
                    </a>
                    <a
                      href="https://github.com/arman-miaa"
                      target="_blank"
                      className="text-gray-200 text-4xl"
                    >
                      <FaGithub></FaGithub>{" "}
                    </a>
                  </div>
                </div>
              </fieldset>
            </form>
          </footer>
        </div>
        <footer className="footer footer-center bg-[#1f5b73] text-white p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              BMS Ltd.
            </p>
          </aside>
        </footer>
      </div>
    );
};

export default Footer;