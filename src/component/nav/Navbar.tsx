const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="space-x-4 flex items-center">
        <a href="/" className="text-white hover:text-gray-300 ">
          <span className="text-2xl">🍓</span> JAM
        </a>
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
        <a href="/login" className="text-white hover:text-gray-300">
          Connexion
        </a>
        <a href="/register" className="text-white hover:text-gray-300">
          Inscription
        </a>
        <a href="/cart">
          <i className="fas fa-shopping-cart text-white text-2xl"></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
