import React, { useEffect, useState } from "react";
import { FaStar, FaUserAlt, FaCalendarAlt, FaTimes } from "react-icons/fa";
import StarRating from "./StarRating";
import Loader from "./Loader";

const key: string = "55429466";

interface WatchedMovie {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: string;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Runtime: string;
  Poster: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

const defaultMovie: MovieDetails = {
  Title: "",
  Year: "",
  Runtime: "",
  Poster: "",
  imdbRating: "",
  Plot: "",
  Released: "",
  Actors: "",
  Director: "",
  Genre: "",
};

interface MovieDetailsCardProps {
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}

const MovieDetailsCard: React.FC<MovieDetailsCardProps> = ({
  selectedId,
  setSelectedId,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState<MovieDetails>(defaultMovie);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleCloseButton() {
    setSelectedId(null);
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie: WatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(imdbRating) || 0, // Handle potential NaN
      runtime: Number(runtime) || 0, // Handle potential NaN
      userRating,
    };
    onAddWatched(newWatchedMovie);
  }

  useEffect(() => {
    async function fetchMovieDetails() {
      if (!selectedId) return; // Avoid fetching if no ID is selected
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${key}`
        );
        const data = await res.json();

        // Ensure data is not an error response
        if (data.Response === "True") {
          setMovie(data);
        } else {
          console.error("Movie not found or an error occurred:", data.Error);
        }
      } catch (err) {
        console.error("Failed to fetch movie details:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [selectedId]);

  return (
    <div className="bg-gradient-to-r font-poppins from-white to-violet-400 w-full min-h-full flex justify-center items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg w-full max-w-4xl m-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <img
              src={poster}
              alt="Movie Poster"
              className="w-full md:w-1/3 rounded-lg shadow-md object-cover"
            />

            {/* Movie Details */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 justify-between">
                {title} ({year})
                <div>
                  <button onClick={handleCloseButton}>
                    <FaTimes className="text-red-600 hover:text-red-400 transition-all" />
                  </button>
                </div>
              </h1>

              <p className="text-gray-600 mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-pink-400" /> {runtime} | {genre}
              </p>

              {/* IMDb Rating */}
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 text-xl mr-2" />
                <span className="text-xl">{imdbRating}</span>
              </div>

              {/* Plot */}
              <p className="mb-4">{plot}</p>

              {/* Director and Cast */}
              <p className="mb-2 flex items-center gap-2">
                <FaUserAlt className="text-green-400" />
                <strong>Director:</strong> {director}
              </p>
              <p className="mb-2 flex items-center gap-2">
                <FaUserAlt className="text-green-400" /> <strong>Cast:</strong>{" "}
                {actors}
              </p>

              {/* Release Date */}
              <p className="text-gray-600 flex items-center gap-2">
                <FaCalendarAlt className="text-pink-400" />{" "}
                <strong>Released:</strong> {released}
              </p>

              {/* Star Rating and Add to List */}
              <div className="mt-6">
                <div className="shadow-xl text-white border flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-violet-600 md:w-full">
                  {!isWatched ? (
                    <>
                      <button
                        className="relative text-sm font-semibold p-2 rounded-lg bg-white hover:bg-violet-500 transition-all duration-300 text-black px-6 shadow-md hover:shadow-lg transform hover:scale-105 hover:text-white"
                        onClick={handleAdd}
                      >
                        Add to List
                      </button>
                      <StarRating
                        maxRating={10}
                        size={20}
                        className="mt-4 md:mt-0"
                        onSetRating={setUserRating}
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-between gap-2 font-bold">
                      <span className="">You Rated this Movie:</span>
                      {watchedUserRating}
                      <FaStar className="text-orange-300" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsCard;
