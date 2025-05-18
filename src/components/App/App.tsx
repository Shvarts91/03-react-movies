import { useState } from "react";

import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";

// import css from "./App.css";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleOrder = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await fetchMovies(searchQuery);
    if (Array.isArray(data)) {
      setMovies(data);
    }

    if (data?.length === 0) {
      toast.error("No movies found for your request.");
    }

    if (error) {
      setError(error);
      setMovies([]);
    }

    setIsLoading(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleOrder} />

      {isLoading && <Loader />}

      {!isLoading && error && <ErrorMessage />}

      {!isLoading && !error && <MovieGrid movies={movies} />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
