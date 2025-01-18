import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

import notFoundImg from "../../../../src/assets/not-found.png";

const UserProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user profile data
  const { data = {}, isLoading } = useQuery({
    queryKey: ["userProfile", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/usersProfileAgreement/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Default values if no agreement
  const agreementDate = data.agreementDate || "None";
  const floor = data.floor || "None";
  const block = data.block || "None";
  const room = data.room || "None";

  return (
    <div>
      <h1 className="text-center font-bold text-2xl mb-4">My Profile</h1>
      <div className="bg-blue-300 w-1/2 min-h-[500px] mx-auto flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL || notFoundImg}
            onError={(e) => (e.target.src = notFoundImg)}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>

          <div className="mt-6 text-left">
            <p>
              <strong>Agreement Accept Date:</strong> {agreementDate}
            </p>
            <p>
              <strong>Floor:</strong> {floor}
            </p>
            <p>
              <strong>Block:</strong> {block}
            </p>
            <p>
              <strong>Room No:</strong> {room}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
