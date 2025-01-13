import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import errorImg from '../../src/assets/error.png'
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Helmet>
          <title>ERROR Page || </title>
        </Helmet>
        <img src={errorImg} alt="" />
        <p className="text-gray-400 mt-2 md:text-3xl">
         
          <Link to="/" className=" ">
            <button className="btn bg-emerald-700 text-xl hover:bg-emerald-800 text-white">Back to Home <FaHome></FaHome> </button>
          </Link>
        </p>
      </div>
    );
};

export default ErrorPage;