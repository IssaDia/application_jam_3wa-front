import { useContext } from "react";
import { CartContext } from "../cart/context/CartContext";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/context/AuthContext";
import Searchbar from "../search/Searchbar";

const Navbar = () => {
  const { cartState } = useContext(CartContext);
  const { authState, authDispatch } = useContext(AuthContext);

  const totalQuantity = cartState.cart.reduce(
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
      <Searchbar />
      {/* Right Section */}
      <div className="space-x-4 flex items-center">
        {authState?.isAuthenticated ? (
          <>
            <span className="text-white">
              Hello, {authState.user?.username}
            </span>
            <NavLink to="/cart">
              <i className="fas fa-shopping-cart text-white text-2xl"></i>
            </NavLink>
            <span className="text-white"> ({totalQuantity})</span>
            <button
              className="text-white hover:text-gray-300 bg-gray-800"
              onClick={() => authDispatch({ type: "LOGOUT" })}
            >
              <i className="fas fa-times"></i>
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
