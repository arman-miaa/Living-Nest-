import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { useState } from "react";
import errorImg from "../../../../src/assets/not-found.png";

const ManageCoupons = () => {
  const axiosSecure = useAxiosSecure();
  const [showModal, setShowModal] = useState(false);
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
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const handleToggleAvailability = async (id, available) => {
    try {
      await axiosSecure.patch(`/coupons/${id}`, { available: !available });
      refetch(); 
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Coupons</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <div className="overflow-x-auto h-[calc(100vh-100px)]">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Coupon Code</th>
              <th>Percentage</th>
              <th>Description</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>
                  <img
                    src={coupon.image || errorImg}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => (e.target.src = errorImg)}
                    alt="Coupon"
                  />
                </td>
                <td>{coupon.code}</td>
                <td>{coupon.percentage}%</td>
                <td>{coupon.description}</td>
                <td>{coupon.available ? "Available" : "Unavailable"}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      handleToggleAvailability(coupon._id, coupon.available)
                    }
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Coupon</h3>
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
                  className="btn btn-secondary mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
