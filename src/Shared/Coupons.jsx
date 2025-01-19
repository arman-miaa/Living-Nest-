import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Coupons = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data = [], 
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic("/coupons");
      return res.data; 
    },
  });


  return [data, isLoading, refetch];
};

export default Coupons;
