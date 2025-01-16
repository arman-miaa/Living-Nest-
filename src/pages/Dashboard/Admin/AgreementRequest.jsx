import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await axiosSecure("/agreementRequests");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Agreement Requests</h1>
      <p>Total Requests: {data.length}</p>
      <div className="grid grid-cols-4 gap-4">
        {data.map((apartment) => {
          // Format the date for better readability
          const formattedDate = new Date(apartment.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div key={apartment._id} className="card bg-base-100 shadow-xl">
              <h2>{apartment.userName}</h2>
              <h2>{apartment.userEmail}</h2>
              <div className="card-body">
                <h2 className="card-title">Floor No: {apartment.floorNo}</h2>
                <p>Block Name: {apartment.blockName}</p>
                <p>Apartment No: {apartment.apartmentNo}</p>
                <p>Rent: {apartment.rent}</p>
                      <p> {formattedDate}</p>
                      <div className="flex justify-between">
                          <button className="btn bg-primary text-white">Accept</button>
                          <button className="btn bg-red-500 text-white">rejected</button>
                      </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgreementRequest;
