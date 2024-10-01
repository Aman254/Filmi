import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaList } from "react-icons/fa";
import React from "react";

interface NavBarProps {
  setShowMovieList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavBar: React.FC<NavBarProps> = ({ setShowMovieList }) => {
  return (
    <nav className="bg-violet-600 text p-6 px-6 ">
      <div className="container flex justify-between items-center">
        <div className="text-white text-2xl font-bold transition-transform duration-300 hover:scale-105">
          <button onClick={() => setShowMovieList(false)}>FILMI</button>
        </div>
        <div className="flex space-x-4 font-medium">
          <Link
            to="/"
            className="flex items-center text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={() => setShowMovieList(false)}
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
            to="/"
            className="flex items-center text-white hover:text-gray-300 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={() => setShowMovieList(true)}
          >
            <FaList className="mr-2 transition-transform duration-300 hover:rotate-12" />
            Mylist
          </Link>
        </div>
      </div>
    </nav>
  );
};
