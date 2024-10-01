import React, { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar"; /**NavBar component */
import { Search } from "../Components/Search"; /**Search Component */
import { Loader } from "../Components/Loader"; /**Loader Component */
import { ErrorMessage } from "../Components/Error"; /**Error Message Component */
import { MovieList } from "../PageComponents/MovieList"; /** MovieList Component for displaying Movies */
import { Footer } from "../Components/Footer";
import MovieDetailsCard from "../Components/MovieDetailsCard";
import { MyList } from "./MyList";

/**Defining Interface for the Data and its types. */
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface WatchedMovie {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  runtime: number;
  userRating: string;
}

export const Home: React.FC = () => {
  /**Key for the Movie Api */
  const key: string = "55429466";

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [movies, setMovies] = useState<Movie[]>([]);

  const [query, setQuery] = useState<string>("Avengers");

  const [isLoading, setIsloading] = useState<boolean>(false);

  const [error, setError] = useState("");

  const [watched, setWatched] = useState<WatchedMovie[]>([]);

  const [showMovieList, setShowMovieList] = useState(false);

  function handleAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  /**useEffect Hook to fect movies on Search or if Query changes. */
  useEffect(() => {
    /**New Abort controller to avoid Race condition on Search/query */
    const controller = new AbortController();
    /**async function to fetch Movies. */
    async function fecthMovies() {
      try {
        // Initially the Loading is true.
        setIsloading(true);
        // Initially the error is empty i.e No Error.
        setError("");

        /** Fetching the Movie*/
        const res = await fetch(
          `https://www.omdbapi.com/?&apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Error in fetching movies.");

        const data = await res.json();

        if (data.Response === "False") throw new Error("Movie not found.");

        /**If everything is Ok set the Data and Error to empty. */
        setMovies(data.Search);
        setError("");
      } catch (err: unknown) {
        /**If we have an Error catch. */
        if (err instanceof Error)
          if (err.name !== "AbortError") {
            //If the Error is Abort Error which is dure to Race condition, don't consider
            console.log(err.message);
            setError(err.message);
          } else {
            console.log("An Unknown error occured.");
            setError(err.message);
          }
      } finally {
        /**resetting the Loading to false, Again */
        setIsloading(false);
        setError("");
      }
    }

    if (query.length <= 3) {
      setMovies([]);
      setError("");
      return;
    }
    // Calling the fetchMovies function.
    fecthMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar setShowMovieList={setShowMovieList} />

      {/* Content will take remaining space pushing footer to the bottom */}
      <div className="flex-grow">
        {/* Passing the Query as props for Search component */}
        <Search query={query} setQuery={setQuery} />

        {selectedId ? (
          <MovieDetailsCard
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAddWatched={handleAddWatched}
            watched={watched}

            // onDeleteWatched={handleDeleteWatched}
          />
        ) : (
          <div className="p-2 m-2 mx-6 my-6 px-4">
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && !showMovieList && (
              <MovieList movies={movies} setSelectedId={setSelectedId} />
            )}
            {showMovieList && (
              <MyList watched={watched} onDeleteWatched={handleDeleteWatched} />
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};
