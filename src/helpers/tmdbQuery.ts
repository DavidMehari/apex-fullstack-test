import { Movie, TmdbQueryResult } from "../types/types";

const tmdbApiKey = process.env.REACT_APP_TMDB_API_KEY;

export const queryTmdbApi = async ( movieId: string ) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${tmdbApiKey}`);
  if (response.ok) {
    const data = await response.json();
    return { status: 'ok', relatedMovies: buildMovieList(data.results) };
  } else {
    return { status: 'error'} ;
  }
}

const buildMovieList = (tmdbQueryResultArray: TmdbQueryResult[]) => {
  const relatedMovies: Movie[] = tmdbQueryResultArray.map((queryResult: TmdbQueryResult) => ({
    id: `${queryResult.id}`,
    name: queryResult.title,
    overview: queryResult.overview,
    score: queryResult.vote_average,
    poster: {
        tiny: `https://image.tmdb.org/t/p/w154/${queryResult.poster_path}`,
        large: `https://image.tmdb.org/t/p/w500/${queryResult.poster_path}`,
    }
  }));
  return relatedMovies;
}