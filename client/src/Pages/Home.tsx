import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar"; /**NavBar component */
import { Search } from "../Components/Search"; /**Search Component */
import { Loader } from "../Components/Loader"; /**Loader Component */
import { ErrorMessage } from "../Components/Error"; /**Error Message Component */
import { MovieList } from "../PageComponents/MovieList"; /** MovieList Component for displaying Movies */

/**Defining Interface for the Data and its types. */
interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

export const Home: React.FC = () => {
  /**Key for the Movie Api */
  const key: number = 55429466;
  /**Defining an Empty Movie array with useState */
  const [movies, setMovies] = useState<Movie[]>([]);
  /** Query with default Avengers for the Api*/
  const [query, setQuery] = useState<string>("Avengers");
  /**The Loading state, a boolean, Initially false */
  const [isLoading, setIsloading] = useState<boolean>(false);
  /**The error state for setting Errors. */
  const [error, setError] = useState("");

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

        /**If there is an Error or response is not ok throw an Error. */
        if (!res.ok) throw new Error("Error in fetching movies.");

        /**Converting the res to the json form and storing in the data.*/
        const data = await res.json();

        /**If there is no Data/Movie requested. */
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
    <div>
      <NavBar />
      {/* Passing the Query as props for Search component */}
      <Search query={query} setQuery={setQuery} />
      <div className="p-2 m-2 mx-6 my-6 px-4">
        {/**If isLoading is true */}
        {isLoading && <Loader />}
        {/**If there is an Error render the ErrorMessage */}
        {error && <ErrorMessage message={error} />}
        {!isLoading && !error && <MovieList movies={movies} />}
      </div>
    </div>
  );
};
