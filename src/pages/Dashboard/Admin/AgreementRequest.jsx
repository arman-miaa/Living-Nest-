import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useTheme();

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
    return <Loading />;
  }

  const handleAcceptBtn = (id) => {
    axiosSecure
      .patch(`/acceptUser/${id}`)
      .then(() => {
        toast.success("User accepted successfully!");
        refetch();
      })
      .catch(() => {
        toast.error("Failed to accept user. Please try again.");
      });
  };

  const handleRejectBtn = (id) => {
    axiosSecure
      .patch(`/rejectedUser/${id}`)
      .then(() => {
        toast.success("User rejected successfully!");
        refetch();
      })
      .catch(() => {
        toast.error("Failed to reject user. Please try again.");
      });
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-6  mb-8 ${
        darkMode ? "bg-dark" : "bg-gray-50"
      }`}
    >
      <SectionTitle
        heading="Agreement Requests"
        subHeading="Manage pending agreement requests here"
      />
      <p className="text-xl text-center text-accent -mt-12">
        Total Requests: <span className="text-secondary">{data.length}</span>
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((apartment) => {
          const formattedDate = new Date(apartment.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div
              key={apartment._id}
              className={`card ${
                darkMode ? "bg-[#272c31]" : "bg-white"
              } shadow-md rounded-lg overflow-hidden`}
            >
              <div className="card-body p-4">
                <h2 className="font-bold text-lg text-primary flex items-center gap-2">
                  <FiUser className="text-primary" /> {apartment.userName}
                </h2>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-50" : "text-gray-600"
                  } flex items-center gap-2`}
                >
                  <FiUser className="text-secondary" /> {apartment.userEmail}
                </p>
                <hr className="my-2" />
                <p
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-50" : ""
                  }`}
                >
                  <MdApartment className="text-primary" /> Floor No:{" "}
                  <strong>{apartment.floorNo}</strong>
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-50" : ""
                  }`}
                >
                  <MdApartment className="text-accent" /> Block Name:{" "}
                  <strong>{apartment.blockName}</strong>
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-50" : ""
                  }`}
                >
                  <MdApartment className="text-secondary" /> Apartment No:{" "}
                  <strong>{apartment.apartmentNo}</strong>
                </p>
                <p
                  className={`flex items-center gap-2 ${
                    darkMode ? "text-gray-50" : ""
                  }`}
                >
                  <FaCheckCircle className="text-green-500" /> Rent:{" "}
                  <strong>${apartment.rent}</strong>
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mt-2">
                  <BsFillCalendarCheckFill className="text-gray-500" /> Date:{" "}
                  {formattedDate}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAcceptBtn(apartment._id)}
                    className="btn bg-primary text-white px-4 py-2 rounded-md shadow hover:bg-accent flex items-center gap-2"
                  >
                    <FaCheckCircle />
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectBtn(apartment._id)}
                    className="btn bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 flex items-center gap-2"
                  >
                    <FaTimesCircle />
                    Reject
                  </button>
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
