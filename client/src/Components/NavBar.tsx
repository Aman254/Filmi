import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaList } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="bg-violet-600 text p-4 ">
      <div className="container flex justify-between items-center">
        <div className="text-white text-2xl font-bold transition-transform duration-300 hover:scale-105">
          FILMI
        </div>
        <div className="flex space-x-4 font-medium">
          <Link
            to="/"
            className="flex items-center text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaHome className="mr-2 transition-transform duration-300 hover:rotate-12" />
            Home
          </Link>

          <Link
            to="/login"
            className="flex items-center text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaSignInAlt className="mr-2 transition-transform duration-300 hover:rotate-12" />
            Login
          </Link>
          <Link
            to="/mylist"
            className="flex items-center text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaList className="mr-2 transition-transform duration-300 hover:rotate-12" />
            Mylist
          </Link>
        </div>
      </div>
    </nav>
  );
}
