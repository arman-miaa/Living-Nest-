import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";
import { useLocation, Navigate } from "react-router-dom";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
  const location = useLocation();

 
  if (
    !location.state ||
    !location.state.email ||
    !location.state.selectedMonth
  ) {
 
    return <Navigate to="/dashboard/makePayment" replace />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Payment Page</h1>
  

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Payment;
