import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../Hooks/useAuth";
import { useTheme } from "../../../Hooks/ThemeProvider ";

const CheckoutForm = ({
  amount,
  email,
  transactionId,
  floorNo,
  blockName,
  apartmentNo,
  apartmentId,
  selectedMonth,
  description,
  title,
}) => {
  const [clientSecret, setClientSecret] = useState("");
  const [transectionId, setTransactionId] = useState(transactionId || "");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { darkMode } = useTheme();

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { rent: amount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
        
          toast.error("Error creating payment intent!");
        });
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: email || user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: email || user.email,
        price: amount,
        transactionId: paymentIntent.id,
        floorNo,
        blockName,
        apartmentNo,
        apartmentId,
        selectedMonth,
        description,
        title,
      };

      const res = await axiosSecure.post("/payment", payment);

      if (res.data) {
        toast.success("Payment Successful!");

        try {
          // Call the update apartment API
          const res2 = await axiosSecure.patch(
            `/updateApartment/${apartmentId}`
          );
          if (res2.data.success) {
           
          } else {
            
          }
         
        } catch (error) {
       
          toast.error("Failed to update apartment availability.");
        }

        // Navigate to payment history
        navigate("/dashboard/paymentHistory", { replace: true });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                iconColor: darkMode ? "#FFD700" : "",
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
        <button
          className="btn bg-orange-500 hover:bg-orange-600 text-white mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay ${amount.toFixed(2)}
        </button>
        {transectionId && (
          <p className="text-green-500 mt-2 font-semibold">
            Your Transaction Id: {transectionId}
          </p>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
