import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import notFoundImg from "../../../../src/assets/not-found.png";
import SectionTitle from "../../../Shared/SectionTitle";
import { FaRegCalendarAlt, FaHome, FaBuilding } from "react-icons/fa";
import { MdOutlineDescription, MdOutlineSubtitles, MdTitle } from "react-icons/md";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["agreement", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`agreement/${user.email}`);
      return res.data;
    },
  });


  if (isLoading) return <Loading />;

  const formatDate = (date) => {
    if (!date) return "Not Available";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 md:p-16 ">
      {/* <SectionTitle
        heading="Welcome to Your Profile"
        subHeading="Manage your details and agreements with ease."
      /> */}

      <div className="bg-white mx-auto  p-8 rounded-xl shadow-xl max-w-3xl relative">
        {/* Cover Image and Profile */}
        <div className="relative mb-16">
          <div className="h-40 bg-gradient-to-r from-primary to-[#1f5b73] rounded-t-lg">
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
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Agreement Info */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Agreement Details
          </h3>
          <div className="flex items-center">
            {/* <MdOutlineSubtitles className="text-primary mr-2" /> */}
            <span className="text-xl font-semibold text-primary md:text-2xl">
              {data.title || "Not Available"}
            </span>
          </div>
          <div className="flex items-start mt-1">
            {/* <MdOutlineDescription className="text-primary mr-2 mt-1" /> */}
            <span>{data.description || "Not Available"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="flex items-center">
              <FaRegCalendarAlt className="text-primary mr-2" />
              <span>
                <strong>Agreement Date:</strong> {formatDate(data.date)}
              </span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-primary mr-2" />
              <span>
                <strong>Apartment No:</strong>{" "}
                {data.apartmentNo || "Not Available"}
              </span>
            </div>
            <div className="flex items-center">
              <FaBuilding className="text-primary mr-2" />
              <span>
                <strong>Block:</strong> {data.blockName || "Not Available"}
              </span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-primary mr-2" />
              <span>
                <strong>Floor No:</strong> {data.floorNo || "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
