import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import notFoundImg from "../../../../src/assets/not-found.png";

const MemberProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch agreement data
  const { data = {}, isLoading } = useQuery({
    queryKey: ["agreement", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`agreement/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">Member Profile</h1>
      <div className="bg-white shadow-md rounded-lg w-3/4 max-w-2xl p-6">
        <div className="flex flex-col items-center">
          {/* User Image */}
          <img
            src={user.photoURL || notFoundImg}
            onError={(e) => (e.target.src = notFoundImg)}
            alt="User Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />

          {/* User Info */}
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Agreement Info */}
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Agreement Details</h3>
          <ul className="space-y-2">
            <li>
              <strong>Agreement Date:</strong> {data.date}
            </li>
            <li>
              <strong>ApartmentNO:</strong> {data.apartmentNo}
            </li>
            <li>
              <strong>Block:</strong> {data.blockName}
            </li>
            <li>
              <strong>FloorNO:</strong> {data.floorNo}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
