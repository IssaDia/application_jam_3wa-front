import React, { useState } from "react";

const Card = ({ image, title, price }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
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
            onClick={() => {
              // Handle the 'Ajouter' button action
              // You can add the product to the cart here
            }}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
