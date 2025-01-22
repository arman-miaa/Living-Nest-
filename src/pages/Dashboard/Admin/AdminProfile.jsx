import {
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import SectionTitle from "../../../Shared/SectionTitle";

const AdminProfile = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["adminInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/info");
      return res.data;
    },
  });

  if (loader || isLoading) return <Loading />;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <SectionTitle
        heading="Admin Profile"
        subHeading="Manage your account, view system statistics, and oversee platform operations from your personalized admin dashboard."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded shadow flex items-center gap-4">
          <FaBuilding className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Total Apartments</h3>
            <p className="text-2xl">{data.total}</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded shadow flex items-center gap-4">
          <FaCheckCircle className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Available</h3>
            <p className="text-2xl">{data.available}%</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded shadow flex items-center gap-4">
          <FaTimesCircle className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Unavailable</h3>
            <p className="text-2xl">{data.unavailable}%</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded shadow flex items-center gap-4">
          <FaUsers className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Total Users</h3>
            <p className="text-2xl">{data.totalUsers}</p>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded shadow flex items-center gap-4">
          <FaUserTie className="text-3xl" />
          <div>
            <h3 className="text-xl font-bold">Total Members</h3>
            <p className="text-2xl">{data.totalMembers}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-white p-6 rounded shadow relative">
          {/* Cover Section */}
          <div className="h-32 bg-gradient-to-r from-primary to-accent rounded-t-lg"></div>
          {/* Profile Content */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
            <img
              src={user.photoURL}
              alt="Admin"
              className="w-28 h-28 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold text-accent">
              {user.displayName}
            </h2>
            <p className="text-lg text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded shadow">
          {/* Placeholder for your chart */}
          <h3 className="text-xl font-bold mb-4">Sales Overview</h3>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
