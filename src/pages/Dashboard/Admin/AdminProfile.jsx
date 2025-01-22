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
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A078FF"];
const RADIAN = Math.PI / 180;

// Custom label for PieChart
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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
  console.log(data);

  if (loader || isLoading) return <Loading />;
const availableValue = Math.round((data.available / 100) * data.total);
const unavailableValue = Math.round((data.unavailable / 100) * data.total);

  const chartData = [
    { name: "Total Apartments", value: data.total || 0 },
    { name: "Available", value: availableValue || 0 },
    { name: "Unavailable", value: unavailableValue || 0 },
    { name: "Total Users", value: data.totalUsers || 0 },
    { name: "Total Members", value: data.totalMembers || 0 },
  ];
  // console.log(chartData);

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <SectionTitle
        heading="Admin Profile"
        subHeading="Manage your account, view system statistics, and oversee platform operations from your personalized admin dashboard."
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<FaBuilding className="text-3xl" />}
          title="Total Apartments"
          value={data.total}
          colors="from-blue-500 to-purple-600"
        />
        <StatCard
          icon={<FaCheckCircle className="text-3xl" />}
          title="Available"
          value={data.available}
          colors="from-green-500 to-teal-600"
        />
        <StatCard
          icon={<FaTimesCircle className="text-3xl" />}
          title="Unavailable"
          value={data.unavailable}
          colors="from-red-500 to-orange-600"
        />
        <StatCard
          icon={<FaUsers className="text-3xl" />}
          title="Total Users"
          value={data.totalUsers}
          colors="from-purple-500 to-pink-600"
        />
        <StatCard
          icon={<FaUserTie className="text-3xl" />}
          title="Total Members"
          value={data.totalMembers}
          colors="from-purple-600 to-indigo-500"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Section */}
        <div className="bg-white text-center p-6 rounded shadow">
          <div className="h-32 bg-gradient-to-r from-primary to-accent rounded-t-lg"></div>
          <img
            src={user.photoURL}
            alt="Admin"
            className="w-28 h-28 rounded-full border-4 border-white object-cover -mt-14 mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">{user.displayName}</h2>
          <p className="text-lg text-gray-500">{user.email}</p>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Overview Chart</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                {/* Tooltip for hover effect */}
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, colors }) => (
  <div
    className={`p-4 bg-gradient-to-r ${colors} text-white rounded shadow flex items-center gap-4`}
  >
    {icon}
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  </div>
);

export default AdminProfile;
