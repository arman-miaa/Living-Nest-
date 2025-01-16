import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

const MemberProfile = () => {
  const { user } = useAuth();
  // console.log(user);
  const axiosSequre = useAxiosSecure();
  const {
    data = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const res = await axiosSequre.get(`agreement/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) <Loading />;
  console.log(data);
  return (
    <div>
      Member profile
      <div className="bg-blue-300 w-1/2 min-h-[500px]  flex justify-center items-center">
        <div className="flex flex-col items-center">
          <img src={user.photoURL} alt="" />
          <h1>{user.displayName}</h1>
          <p>{user.email}</p>
          <h3>{data.date}</h3>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
