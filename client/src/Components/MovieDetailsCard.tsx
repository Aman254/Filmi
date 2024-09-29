import React from "react";
import { FaStar, FaUserAlt, FaFilm, FaCalendarAlt } from "react-icons/fa";
import StarRating from "./StarRating";

const MovieDetailsCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r font-poppins from-white to-violet-400 w-full min-h-full flex justify-center items-center">
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-4xl m-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Movie Poster */}
          <img
            src="https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"
            alt="Guardians of the Galaxy Vol. 2 Poster"
            className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
          />

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FaFilm className="text-indigo-500" />
              Guardians of the Galaxy Vol. 2 (2017)
            </h1>

            <p className="text-gray-600 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-pink-400" /> PG-13 | 136 min |
              Action, Adventure, Comedy
            </p>

            {/* IMDb Rating */}
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 text-xl mr-2" />
              <span className="text-xl">7.6/10</span>
            </div>

            {/* Plot */}
            <p className="mb-4">
              The Guardians struggle to keep together as a team while dealing
              with their personal family issues, notably Star-Lord's encounter
              with his father, the ambitious celestial being Ego.
            </p>

            {/* Director and Cast */}
            <p className="mb-2 flex items-center gap-2">
              <FaUserAlt className="text-green-400" />{" "}
              <strong>Director:</strong> James Gunn
            </p>
            <p className="mb-2 flex items-center gap-2">
              <FaUserAlt className="text-green-400" /> <strong>Cast:</strong>{" "}
              Chris Pratt, Zoe Saldana, Dave Bautista
            </p>

            {/* Release Date */}
            <p className="text-gray-600 flex items-center gap-2">
              <FaCalendarAlt className="text-pink-400" />{" "}
              <strong>Released:</strong> 05 May 2017
            </p>

            {/* Star Rating and Add to List */}
            <div className="mt-6">
              <div className="shadow-xl text-white border flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-violet-600 md:w-full">
                <button
                  className="text-sm font-semibold p-2 rounded-lg bg-white
                hover:bg-violet-400 transition-all text-black px-6"
                >
                  + Add to List
                </button>
                <StarRating maxRating={10} size={20} className="mt-4 md:mt-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
