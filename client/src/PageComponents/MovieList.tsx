import { MovieCards } from "../Components/MovieCards";
import React from "react";

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface MovieListProp {
  movies: Movie[];
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const MovieList: React.FC<MovieListProp> = ({
  movies,
  setSelectedId,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      {movies?.map((movie) => (
        <MovieCards
          movie={movie}
          key={movie.imdbID}
          setSelectedId={setSelectedId}
        />
      ))}
    </div>
  );
};
