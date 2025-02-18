import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle";
import Button from "../../../Shared/Button";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

  const location = useLocation();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(location.state?.rent || 0);
  const { darkMode } = useTheme();

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
    <div className="p-6 space-y-8">
      <SectionTitle
        heading="Payment Page"
        subHeading="You can make a payment here and apply a coupon for discounts"
      />

      <div className="space-y-4">
        {/* Coupon Section */}
        <div className="flex flex-col md:flex-row  items-center gap-4">
          <div className="w-full md:w-1/2">
            <label
              className={`block font-semibold text-lg ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Apply Coupon
            </label>
            <input
              type="text"
              placeholder="Enter coupon code"
              onChange={(e) => setCoupon(e.target.value)}
              className="input input-bordered mt-1 w-full border-emerald-700 focus:ring-2 focus:outline-none"
            />
          </div>
          <div
            onClick={handleApplyCoupon}
            className="md:mt-8 border-4 w-full md:w-auto"
          >
            {" "}
            <Button styleBtn="Apply" />
          </div>
        </div>

        {/* Rent Details */}
        <div>
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Original Rent: ${location.state.rent.toFixed(2)}
          </h2>
          {discount > 0 && (
            <h3 className="text-lg text-green-500">
              Discount Applied: {discount}% (New Total: $
              {finalAmount.toFixed(2)})
            </h3>
          )}
        </div>
      </div>

      {/* Payment Section */}
      <div className="space-y-4">
        <h2
          className={`text-xl font-semibold ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Please make your payment using your card:
        </h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            amount={finalAmount}
            email={location.state.email}
            selectedMonth={location.state.selectedMonth}
            floorNo={location.state.floorNo}
            blockName={location.state.blockName}
            apartmentNo={location.state.apartmentNo}
            apartmentId={location.state.apartmentId}
            description={location.state.description}
            title={location.state.title}
            originalRent={location.state.rent}
          />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
