import { FaCalendarAlt } from "react-icons/fa"; // Import an icon for the year
import Button from "./Button";
import React from "react";

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface MovieProps {
  movie: Movie;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MovieCards: React.FC<MovieProps> = ({ movie, setSelectedId }) => {
  function handleDetailsClcik() {
    setSelectedId(movie.imdbID);
  }
  return (
    <div className="card font-poppins">
      <img
        src={movie.Poster}
        alt="Star Wars"
        className="rounded-lg max-w-full min-w-full min-h-[250px] max-h-[250px] object-cover"
      />
      <div className="p-2">
        <h2 className="text-xl font-bold text-gray-800">{movie.Title}</h2>
        <div className="mt-2 text-xl text-gray-600 flex items-center gap-2">
          <FaCalendarAlt className="inline-block text-blue-500" />
          <span className="ml-1 text-sm">Year: {movie.Year}</span>

          <Button title="Details" onClick={handleDetailsClcik} />
        </div>
      </div>
    </div>
  );
};
