import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import { loadStripe } from "@stripe/stripe-js";


const Payment = () => {
   

  
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