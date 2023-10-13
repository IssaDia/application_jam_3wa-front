import { useContext } from "react";
import { CartContext } from "../cart/context/CartContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { state } = useContext(CartContext);

  const totalQuantity = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="space-x-4 flex items-center">
        <NavLink to="/" className="text-white hover:text-gray-300 ">
          <span className="text-2xl">🍓</span> JAM
        </NavLink>
      </div>

      {/* Middle Section - Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Recherche"
          className="bg-gray-700 text-white px-2 py-1"
        />
        <button className="bg-gray-700 text-white px-2 py-1">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Right Section */}
      <div className="space-x-4 flex items-center">
        <NavLink to="/login" className="text-white hover:text-gray-300">
          Connexion
        </NavLink>
        <NavLink to="/register" className="text-white hover:text-gray-300">
          Inscription
        </NavLink>
        <NavLink to="/cart">
          <i className="fas fa-shopping-cart text-white text-2xl"></i>
        </NavLink>
        <span className="text-white"> ({totalQuantity})</span>
      </div>
    </nav>
  );
};

export default Navbar;
