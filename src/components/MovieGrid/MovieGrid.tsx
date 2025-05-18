import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MovieGridProps {
  movies: Movie[];
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <>
      <ul className={css.grid}>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <div className={css.card}>
                <img
                  className={css.image}
                  // src={movie.poster_path}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
                <h2 className={css.title}>{movie.title}</h2>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MovieGrid;
