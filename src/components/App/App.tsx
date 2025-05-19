import { useState } from "react";

import fetchMovies from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const openModal = () => setIsOpenModal(true);

  const closeModal = () => {
    setIsOpenModal(false);
    setMovie(null);
  };

  const getMovieById = (movie: Movie) => {
    openModal();
    setMovie(movie);
  };

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

      {!isLoading && !error && (
        <MovieGrid onClickMovie={getMovieById} movies={movies} />
      )}
      {isOpenModal && movie && (
        <MovieModal movie={movie} onClose={closeModal} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
