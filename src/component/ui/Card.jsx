import React, { useState, useContext } from "react";
import { CartContext } from "../cart/context/CartContext";

const Card = ({ image, title, price, product }) => {
  const [quantity, setQuantity] = useState(0);

  const { dispatch: cartDispatch } = useContext(CartContext);

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = (product, quantity) => {
    if (quantity > 0) {
      cartDispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    }
  };

  return (
    <div className="w-full p-4 cursor-pointer">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={`src/assets/images/products/${image}`}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <div className="mt-4">
          <span className="text-xl font-semibold text-green-600">
            ${price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center mt-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleRemove}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 text-center w-8 h-8"
            />
            <button
              onClick={handleAdd}
              className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full"
            >
              +
            </button>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-lg"
            onClick={() => handleAddToCart(product, quantity)}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
