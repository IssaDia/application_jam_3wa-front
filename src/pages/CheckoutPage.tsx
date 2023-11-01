import Checkout from "../component/forms/checkout/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripeKey = `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`;

const stripePromise = loadStripe(stripeKey);

const CheckoutPage = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
    </>
  );
};

export default CheckoutPage;
