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

  const { email, price, floorNo, blockName, apartmentNo,selectedMonth, transactionId } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle
        heading="Payment History"
        subHeading="View details of your recent payments and apartments"
      />
      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-primary">
            <tr>
              <th className="px-6 py-3 text-left text-white font-semibold">
                Property
              </th>
              <th className="px-6 py-3 text-left text-white font-semibold">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Email</td>
              <td className="px-6 py-4 border-t break-words">
                {email || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Price</td>
              <td className="px-6 py-4 border-t">
                ${price || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Floor Number</td>
              <td className="px-6 py-4 border-t">
                {floorNo || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Block Name</td>
              <td className="px-6 py-4 border-t">
                {blockName || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">
                Apartment Number
              </td>
              <td className="px-6 py-4 border-t">
                {apartmentNo || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Mounth</td>
              <td className="px-6 py-4 border-t">
                {selectedMonth || "Not Available"}
              </td>
            </tr>
            <tr className="hover:bg-gray-400">
              <td className="px-6 py-4 border-t font-medium">Transaction ID</td>
              <td className="px-6 py-4 border-t break-words">
                {transactionId || "Not Available"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
