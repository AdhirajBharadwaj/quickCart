import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">QuickCart</h1>
        </Link>
        <div className="flex space-x-4">
          <Link
            to="/cart"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
