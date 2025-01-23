import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import Loading from "../pages/Loading";
import { data } from "react-router-dom";


const useRole = () => {
    const { user, loader } = useAuth();
    const axiosSecure = useAxiosSecure();
   
    if (loader) {
      return  <Loading/>
    }
   

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user.email}`);
   
      return data.role;
    },
  });
 

  if (!isLoading) {
    <Loading/>
  }

  return [role, isLoading];
};


export default useRole;