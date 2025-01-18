import { CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";


const CheckoutForm = () => {
     const [clientSecret, setClientSecret] = useState("");
     const [transectionId, setTransactionId] = useState("");
    const axiosSecure = useAxiosSecure();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
// console.log(errro);
       const location = useLocation();
    const { state } = location;
    console.log(transectionId);

       // Access the data
       const { email, floorNo, blockName, apartmentNo, rent, selectedMonth } =
         state || {};
    //    console.log('rent', typeof(rent));

    // useEffect(() => {
    //     axiosSecure.post("/create-payment-intent",rent)
    //         .then(res => {
                
    //             setClientSecret(res.data.clientSecret)
    //         console.log('secret---',res.data.clientSecret);
    //     })
    // }, [])

     useEffect(() => {
       if (rent > 0) {
         axiosSecure
           .post("/create-payment-intent",  {rent} )
           .then((res) => {
             console.log(res.data.clientSecret);
             setClientSecret(res.data.clientSecret);
           })
           .catch((error) =>
             console.error("Error creating payment intent:", error)
           );
       } else {
         console.warn("Total price is 0, skipping API call.");
       }
     }, [axiosSecure, rent]);
    
  

  const   handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    // const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error] 1", error);
      setError("[error]", error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
      }
    }
    // payment information floorNo, blockName, apartmentNo, rent, selectedMonth
    const payment = {
      email: user.email,
      price: rent,
      floorNo,
        blockName,
       transactionId: paymentIntent.id,
      apartmentNo,
      selectedMonth,
    };
    console.log(payment);
    const res = await axiosSecure.post("/payment", payment);
    if (res.data) {
      console.log(res.data);
      toast.success("payment success");
    }
  }
    



    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button type="submit" disabled={!stripe}>
            Pay
          </button>
          {transectionId && (
            <p className="text-green-500 mt-2 font-semibold">
              Your Transaction Id: {transectionId}
            </p>
          )}
        </form>
      </div>
    );
};

export default CheckoutForm;