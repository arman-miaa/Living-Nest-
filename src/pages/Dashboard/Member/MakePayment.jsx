import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MakePayment = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [hasPaid, setHasPaid] = useState(false);

  // Fetch agreement data
  const { data = {}, isLoading: agreementLoading } = useQuery({
    queryKey: ["agreement", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`agreement/${user.email}`);
      return res.data;
    },
  });
    console.log(data);

  // Check if the user has already made a payment
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axiosSecure.get(`/payment/${user.email}`);
        if (res.data) {
          setHasPaid(true); 
        } else {
          setHasPaid(false); 
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };
    checkPaymentStatus();
  }, [axiosSecure, user.email]);

  if (agreementLoading) return <Loading />;

  const handlePayment = (e) => {
    e.preventDefault();
    if (hasPaid) {
      alert("You have already made the payment!");
      return;
    }

    console.log("Processing payment...");
    navigate("/dashboard/payment", {
      state: {
        email: user.email,
        floorNo: data.floorNo || "None",
        blockName: data.blockName || "None",
        apartmentNo: data.apartmentNo || "None",
            rent: data.rent || "None",
        apartmentId: data.apartmentId,
        selectedMonth: e.target?.month?.value,
      },
    });
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Make Payment</h1>
      <form className="card-body" onSubmit={handlePayment}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            defaultValue={user.email}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Floor</span>
          </label>
          <input
            type="text"
            defaultValue={data.floorNo || "None"}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Block</span>
          </label>
          <input
            type="text"
            defaultValue={data.blockName || "None"}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Apartment No</span>
          </label>
          <input
            type="text"
            defaultValue={data.apartmentNo || "None"}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rent</span>
          </label>
          <input
            type="text"
            defaultValue={data.rent || "None"}
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Select Month</span>
          </label>
          <select name="month" className="select select-bordered" required>
            <option value="">--Select Month--</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary" disabled={hasPaid}>
            {hasPaid ? "Payment Completed" : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakePayment;
