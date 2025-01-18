import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "./checkoutForm";
import { loadStripe } from "@stripe/stripe-js";


const Payment = () => {
      const location = useLocation(); 
      const { state } = location; 

      // Access the data
      const { email, floorNo, blockName, apartmentNo, rent, selectedMonth } =
        state || {};
    console.log(state);
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
      <div>
        payment
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    );
};

export default Payment;