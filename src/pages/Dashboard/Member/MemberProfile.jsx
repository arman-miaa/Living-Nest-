import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import notFoundImg from "../../../../src/assets/not-found.png";
import SectionTitle from "../../../Shared/SectionTitle";

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
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-10">
      <SectionTitle
        heading="Welcome to Your Profile"
        subHeading="Manage your details and agreements with ease."
      />

      <div className="bg-white shadow-2xl rounded-xl w-full max-w-3xl mx-auto p-8">
        <div className="relative">
          {/* Cover Section */}
          <div className="h-40 bg-gradient-to-r from-accent to-[#1f5b73] rounded-t-lg"></div>
          {/* Profile Image */}
          <img
            src={user.photoURL || notFoundImg}
            onError={(e) => (e.target.src = notFoundImg)}
            alt="User Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover absolute -bottom-14 left-1/2 transform -translate-x-1/2"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.displayName}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Agreement Info */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Agreement Details
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong className="block text-gray-600">Agreement Date:</strong>
              <span>{formatDate(data.date)}</span>
            </div>
            <div>
              <strong className="block text-gray-600">Apartment No:</strong>
              <span>{data.apartmentNo || "Not Available"}</span>
            </div>
            <div>
              <strong className="block text-gray-600">Block:</strong>
              <span>{data.blockName || "Not Available"}</span>
            </div>
            <div>
              <strong className="block text-gray-600">Floor No:</strong>
              <span>{data.floorNo || "Not Available"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
