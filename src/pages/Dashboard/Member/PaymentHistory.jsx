import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loading";
import SectionTitle from "../../../Shared/SectionTitle";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Destructure data
  const { email, price, floorNo, blockName, apartmentNo, transactionId } = data;

  return (
    <div className="container mx-auto p-6">
      <SectionTitle heading={`Payment History`} subHeading={`you can see here your rented apartmens details`}/>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Property</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                Email
              </td>
              <td className="border border-gray-300 px-4 py-2">{email}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                Price
              </td>
              <td className="border border-gray-300 px-4 py-2">${price}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                Floor Number
              </td>
              <td className="border border-gray-300 px-4 py-2">{floorNo}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                Block Name
              </td>
              <td className="border border-gray-300 px-4 py-2">{blockName}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                Apartment Number
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {apartmentNo}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">
                TransectionId
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {transactionId}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
