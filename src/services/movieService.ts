import type { Movie } from "../types/movie";
import axios from "axios";

interface MovieResponse {
  data: Movie[] | null;
  error: string | null;
}

interface FetchMoviesHttpResponse {
  results: Movie[];
}

async function fetchMovies(query: string): Promise<MovieResponse> {
  try {
    const response = await axios.get<FetchMoviesHttpResponse>(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );
    return { data: response.data.results, error: null };
  } catch (error) {
    let message = "Unknown error occurred.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.status_message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return {
      data: null,
      error: message,
    };
  }
}

export default fetchMovies;
