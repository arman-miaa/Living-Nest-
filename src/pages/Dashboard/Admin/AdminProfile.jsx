import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";

const AdminProfile = () => {
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
      Admin profile
      <div className="">
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img
              src={user.photoURL}
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Admin</h2>
                      <p>{ user.displayName}</p>
                      <p>{ user.email}</p>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

