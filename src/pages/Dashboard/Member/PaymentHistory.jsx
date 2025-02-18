import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Loading";
import SectionTitle from "../../../Shared/SectionTitle";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { darkMode } = useTheme();

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
    <div className="container mx-auto px-4">
      <SectionTitle
        heading="Payment History"
        subHeading="View details of your recent payments and apartments"
      />
      <div className="overflow-x-auto shadow-md rounded-lg border -mt-8 border-gray-200">
        <table
          className={`min-w-full  text-sm  ${darkMode ? "bg-[#30363c]" : ""}`}
        >
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
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Email
              </td>

              {/* <td className="px-6 py-4 border-t break-words"> */}
              <td
                className={`px-6 py-4 border-t break-words ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {email || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Price
              </td>
              <td
                className={`px-6 py-4 border-t ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                ${price || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Floor Number
              </td>
              <td
                className={`px-6 py-4 border-t ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {floorNo || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Block Name
              </td>
              <td
                className={`px-6 py-4 border-t ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {blockName || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Apartment Number
              </td>
              <td
                className={`px-6 py-4 border-t ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {apartmentNo || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Mounth
              </td>
              <td
                className={`px-6 py-4 border-t ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {selectedMonth || "Not Available"}
              </td>
            </tr>
            <tr
              className={` ${
                darkMode ? "hover:bg-[#3f474f]" : "hover:bg-gray-50"
              } cursor-pointer`}
            >
              <td
                className={`px-6 py-4 border-t font-medium ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                Transaction ID
              </td>
              <td
                className={`px-6 py-4 border-t break-words ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
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
