import { useContext } from "react";
import { CartContext } from "../component/cart/context/CartContext";
import { Link } from "react-router-dom";
import PaymentApiClient from "../api/ApiPlatform/PaymentProvider";
import { PaymentUseCaseImpl } from "../useCases/useCases";

const CartPage = () => {
  const { cartState } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartState.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePayment = async (event: any) => {
    let cartData;
    const cartDataJSON = localStorage.getItem("cart");

    if (cartDataJSON !== null) {
      cartData = JSON.parse(cartDataJSON);
    }

    event.preventDefault();

    try {
      const paymentApiClient = new PaymentApiClient();
      const paymenttUseCase = new PaymentUseCaseImpl(paymentApiClient);

      const paymentResponse: string = await paymenttUseCase.handlePayment(
        cartData
      );
      console.log("Payment successful: ", paymentResponse);

      window.location.replace(paymentResponse);
      localStorage.removeItem("cart");
    } catch (error: any) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartState.cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartState.cart.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={`src/assets/images/products/${item.image}`}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartState.cart.length > 0 && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total Price: ${calculateTotalPrice()}
          </p>
          <Link to="/checkout">
            <button
              onClick={(e) => handlePayment(e)}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
