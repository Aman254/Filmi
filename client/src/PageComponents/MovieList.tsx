import { MovieCards } from "../Components/MovieCards";

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface MovieProp {
  movies: Movie[];
}

export const MovieList: React.FC<MovieProp> = ({ movies }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-2">
      {movies?.map((movie) => (
        <MovieCards movie={movie} key={movie.imdbID} />
      ))}
    </div>
  );
};
