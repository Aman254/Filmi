import React from "react";
import { FaFilm, FaStar, FaClock, FaUsers, FaTimes } from "react-icons/fa";

interface WatchedMovie {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: string;
}

interface MyListProps {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

export const MyList: React.FC<MyListProps> = ({ watched, onDeleteWatched }) => {
  const calculateAverage = (arr: number[]): number => {
    return arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  };

  const totalMoviesWatched = watched.length;

  const imdbRatings = watched.map((movie) => movie.imdbRating);

  const userRatings = watched
    .map((movie) => parseFloat(movie.userRating))
    .filter((rating) => !isNaN(rating));

  const avgImdbRating =
    imdbRatings.length > 0 ? calculateAverage(imdbRatings).toFixed(1) : "0.0";

  const avgUserRating =
    userRatings.length > 0 ? calculateAverage(userRatings).toFixed(1) : "N/A";

  const avgRating =
    imdbRatings.length > 0 && userRatings.length > 0
      ? ((parseFloat(avgImdbRating) + parseFloat(avgUserRating)) / 2).toFixed(1)
      : "N/A";

  const totalRuntime = watched.reduce((acc, movie) => acc + movie.runtime, 0); // Summing the runtime of all movies

  return (
    <>
      <div className="font-poppins w-full flex flex-col md:flex-row items-center p-4 space-y-6 md:space-y-0 md:space-x-6 justify-center mt-10">
        {/* Stats Section */}
        <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-6 w-full max-w-lg rounded-lg shadow-lg text-white">
          <h3 className="text-lg font-semibold text-center mb-6">
            Movies You Watched
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white text-violet-500 p-4 rounded-lg shadow-md">
              <FaFilm className="text-yellow-500 text-2xl" />
              <span className="font-semibold text-lg">Total Movies</span>
              <span>{totalMoviesWatched}</span>
            </div>

            <div className="flex justify-between items-center bg-white text-violet-500 p-4 rounded-lg shadow-md">
              <FaStar className="text-orange-400 text-2xl" />
              <span className="font-semibold text-lg">Avg IMDb Rating</span>
              <span>{avgImdbRating}</span>
            </div>

            <div className="flex justify-between items-center bg-white text-violet-500 p-4 rounded-lg shadow-md">
              <FaUsers className="text-blue-400 text-2xl" />
              <span className="font-semibold text-lg">Avg User Rating</span>
              <span>{avgUserRating}</span>
            </div>

            <div className="flex justify-between items-center bg-white text-violet-500 p-4 rounded-lg shadow-md">
              <FaStar className="text-orange-400 text-2xl" />
              <span className="font-semibold text-lg">Avg Overall Rating</span>
              <span>{avgRating}</span>
            </div>

            <div className="flex justify-between items-center bg-white text-violet-500 p-4 rounded-lg shadow-md">
              <FaClock className="text-pink-400 text-2xl" />
              <span className="font-semibold text-lg">Total Runtime</span>
              <span>{totalRuntime} Mins</span> {/* Display the runtime here */}
            </div>
          </div>
        </div>

        {/* Movies List Section */}
        <div className="w-full max-w-lg">
          {watched.map((movie) => (
            <div
              key={movie.imdbID}
              className="bg-white text-violet-500 p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center transition-transform duration-300 hover:scale-105"
            >
              <div>
                <img
                  src={movie.poster}
                  className="max-w-12 max-h-26 rounded-sm"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-950">
                  {movie.title}
                </h4>
                <div className="flex space-x-4 mt-2 font-poppins font-semibold">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-orange-400" />
                    <p className="text-sm">IMDb Rating: {movie.imdbRating}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaClock className="text-pink-400" />
                    <p className="text-sm">Runtime: {movie.runtime} Mins</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-orange-400" />
                    <p className="text-sm">User Rating: {movie.userRating}</p>
                  </div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
                onClick={() => onDeleteWatched(movie.imdbID)}
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
