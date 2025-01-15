import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Loading from "../pages/Loading";


const useRole = () => {
    const { user, loader } = useAuth();
    const axiosSecure = useAxiosSecure();
   
    if (loader) {
      return  <Loading/>
    }
    // console.log('user get',user);

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user.email}`);
    //   console.log("Fetched role:", data.role); 
      return data.role;
    },
  });

  if (!isLoading) {
    console.log("User Role:", role);
  }

  return [role, isLoading];
};


export default useRole;