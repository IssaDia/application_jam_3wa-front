import { CartContext } from "../../cart/context/CartContext";
import { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { PaymentMethod } from "../../../useCases/entities";
import PaymentApiClient from "../../../api/ApiPlatform/PaymentProvider";
import { PaymentUseCaseImpl } from "../../../useCases/useCases";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartState } = useContext(CartContext);

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handlePayment = async (event: any) => {
    const cartDataJSON = localStorage.getItem("cart");
    console.log(cartDataJSON);

    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = await elements.getElement(CardElement);

    console.log(cardElement, "cardElement");

    const paymentMethod: PaymentMethod = {
      cardElement: cardElement,
    };

    console.log(paymentMethod, "paymentMethod");

    try {
      const paymentApiClient = new PaymentApiClient();
      const paymenttUseCase = new PaymentUseCaseImpl(paymentApiClient);

      const paymentResponse = await paymenttUseCase.handlePayment(
        paymentMethod
      );

      // Handle the payment response, e.bg., show a success message
      console.log("Payment successful: ", paymentResponse);

      setLoading(false);
    } catch (error: any) {
      // Handle payment error
      console.error("Payment error:", error);
      setPaymentError(error.message);
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    return cartState.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={() => handlePayment(event)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Card Details
          </label>
          <div className="rounded border border-gray-400 p-2">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                  },
                },
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 w-full"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {paymentError && (
          <p className="text-red-500 text-sm mt-2">{paymentError}</p>
        )}
      </form>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartState.cart.map((item) => {
          return (
            <div key={item.id} className="mb-2">
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">
                Quantity: {item.quantity}, Price: ${item.price}
              </p>
            </div>
          );
        })}

        <p className="text-lg font-semibold mt-4">
          Total Price: ${calculateTotalPrice()}
        </p>
      </div>
    </div>
  );
};

// Calculate the total price of items in the cart

export default Checkout;
