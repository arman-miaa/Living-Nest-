import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { useState } from "react";
import errorImg from "../../../../src/assets/not-found.png";
import SectionTitle from "../../../Shared/SectionTitle";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Button from "../../../Shared/Button";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    description: "",
    image: "",
  });

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosSecure("/coupons");
      return res.data;
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/coupons", formData);
      setShowModal(false);
      setFormData({
        code: "",
        percentage: "",
        description: "",
        image: "",
      });
      refetch();
      toast.success("Coupon added successfully!");
    } catch (error) {
      console.error("Error adding coupon:", error);
      toast.error("Failed to add coupon. Please try again.");
    }
  };

  const handleToggleAvailability = async (id, available) => {
    try {
      await axiosSecure.patch(`/coupons/${id}`, { available: !available });
      refetch();
      toast.success(
        `Coupon is now ${!available ? "Available" : "Unavailable"}`
      );
    } catch (error) {
     
      toast.error("Failed to toggle availability.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div
      className={`min-h-screen p-4 md:p-6 ${
        darkMode ? "bg-dark" : "bg-gray-50"
      }`}
    >
      {/* Header with Add Button */}
      <SectionTitle
        heading="Manage Coupons"
        subHeading="You can here create coupon and change availability"
      />
      <button
        className="btn bg-primary hover:text-accent text-white flex items-center gap-2 mb-6"
        onClick={() => setShowModal(true)}
      >
        <AiOutlinePlusCircle className="text-xl" /> Add Coupon
      </button>

      {/* Coupons Table */}
      <table className="table w-full border-collapse">
        <thead>
          <tr className="bg-accent text-white ">
            <th className="hidden lg:flex text-xs lg:text-base px-1 lg:px-4">
              #
            </th>
            {/* <th className="hidden lg:flex text-xs lg:text-base px-1 lg:px-4">
              Image
            </th> */}
            <th className="text-xs lg:text-base px-1 lg:px-4">Coupon Code</th>
            <th className="text-xs lg:text-base px-1 lg:px-4">Percentage</th>
            <th className="text-xs lg:text-base px-1 lg:px-4">Availability</th>
            <th className="text-xs lg:text-base px-1 lg:px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coupon, index) => (
            <tr
              key={coupon._id}
              className={`${
                darkMode ? "hover:bg-[#30363c]" : "hover:bg-gray-50"
              } transition duration-300 ease-in-out`}
            >
              <td
                className={`hidden lg:flex text-xs lg:text-base px-1 lg:px-4 ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {index + 1}
              </td>
              {/* <td className="hidden lg:flex text-xs lg:text-base px-1 lg:px-4">
                <img
                  src={coupon.image || errorImg}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => (e.target.src = errorImg)}
                  alt="Coupon"
                />
              </td> */}
              <td
                className={`text-xs lg:text-base px-1 lg:px-4 ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {coupon.code}
              </td>
              <td
                className={`text-xs lg:text-base px-1 lg:px-4 ${
                  darkMode ? "text-gray-50" : ""
                }`}
              >
                {coupon.percentage}%
              </td>
              <td className="px-1 lg:px-4">
                <span
                  className={`${
                    coupon.available ? "text-green-500" : "text-red-500"
                  } font-semibold text-xs lg:text-base`}
                >
                  {coupon.available ? "Available" : "Unavailable"}
                </span>
              </td>
              <td className="px-1 lg:px-4">
                <button
                  className="btn bg-orange-400 flex items-center gap-2 hover:bg-gray-200 transition duration-300 text-xs lg:text-base"
                  onClick={() =>
                    handleToggleAvailability(coupon._id, coupon.available)
                  }
                >
                  {coupon.available ? (
                    <FaTimesCircle className="text-red-500 text-lg" />
                  ) : (
                    <FaCheckCircle className="text-green-500 text-lg" />
                  )}
                  <span className="hidden lg:flex text-gray-700">Toggle</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg md:w-96">
            <h3 className="text-lg font-semibold mb-4 text-accent">
              Add New Coupon
            </h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full resize-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn bg-red-500 text-white hover:text-black mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {/* <button type="submit" className="btn btn-primary">
                  Submit
                </button> */}
                <Button styleBtn={`Submit`} />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
