import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

const AdminProfile = () => {
  const { user,loader } = useAuth();

  const axiosSequre = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreement"],
    queryFn: async () => {
      const res = await axiosSequre.get('/admin/info');
      return res.data;
    },
  });

  if (loader || isLoading) return <Loading />;
  // console.log('data',data?.total);
  
  return (
    <div>
      
      <div className="">
        
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img src={user.photoURL} alt="Movie" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Admin</h2>
            <p>{user.displayName}</p>
            <p>{user.email}</p>
          </div>
          <div className="mr-8 mt-8">
            <h3>Total aPartment: {data.total}</h3>
            <h3>Available: {data.available}%</h3>
            <h3>Unavailable: {data.unavailable}%</h3>
            <h3>Total Users: {data.totalUsers}</h3>
            <h3>Total Members: {data.totalMembers}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

