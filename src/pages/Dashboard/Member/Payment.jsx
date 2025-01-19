import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
 // Custom hook for Axios instance

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
 
  const location = useLocation();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0); 
  const [finalAmount, setFinalAmount] = useState(location.state?.rent || 0); 

  if (
    !location.state ||
    !location.state.email ||
    !location.state.selectedMonth
  ) {
    return <Navigate to="/dashboard/makePayment" replace />;
  }

  const handleApplyCoupon = async () => {
    if (!coupon) {
      toast.error("Please enter a coupon code.");
      return;
    }

    try {
      const res = await axiosSecure.get(`/coupons/${coupon}`);
      const couponData = res.data;

      if (couponData.available) {
        const discountValue =
          (couponData.percentage / 100) * location.state.rent;
        const newAmount = location.state.rent - discountValue;

        setDiscount(couponData.percentage);
        setFinalAmount(newAmount);
        toast.success(
          `Coupon applied! ${couponData.percentage}% discount applied.`
        );
      } else {
        setDiscount(0);
        toast.error("Coupon is unavailable or invalid.");
      }
    } catch (error) {
      
      toast.error("Failed to validate coupon. Please try again.");
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold">Payment Page</h1>

      <div className="flex gap-2 items-center">
        <div className="form-control flex">
          <label className="label">
            <span className={`label-text font-semibold `}>Apply Coupon</span>
          </label>
          <input
            type="text"
            placeholder="Apply Coupon"
            onChange={(e) => setCoupon(e.target.value)}
            className={`input border-emerald-700 bg-transparent input-bordered focus:outline-none focus:ring-2 `}
          />
        </div>
        <button onClick={handleApplyCoupon} className="btn btn-primary mt-8">
          Apply
        </button>
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        Original Rent: ${location.state.rent.toFixed(2)}
      </h2>
      {discount > 0 && (
        <h3 className="text-green-500">
          Discount Applied: {discount}% (New Total: ${finalAmount.toFixed(2)})
        </h3>
      )}

      <h2 className="mt-12">Please make your payment with your card:</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm
          amount={finalAmount} // Final amount after applying discount
          email={location.state.email}
          selectedMonth={location.state.selectedMonth}
          floorNo={location.state.floorNo}
          blockName={location.state.blockName}
          apartmentNo={location.state.apartmentNo}
          apartmentId={location.state.apartmentId}
          originalRent={location.state.rent} // Original rent before discount
        />
      </Elements>
    </div>
  );
};

export default Payment;
