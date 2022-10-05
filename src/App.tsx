import { useLazyQuery } from '@apollo/client';
import { Alert, AlertTitle, Container } from '@mui/material';
import ListOfMovies from './components/ListOfMovies';
import Loading from './components/Loading';
import MovieDetails from './components/MovieDetails';
import SearchForm from './components/SearchForm';
import { SEARCH_MOVIES } from './helpers/apollo';
import { useState, useEffect } from 'react';
import { Movie } from './types/types';
import Box from '@mui/material/Box';

const App = () => {
  const [getMovies, { called, loading, error, data }] =
    useLazyQuery(SEARCH_MOVIES);
  
  const [selectedMovie, setselectedMovie] = useState<Movie | null>(null);
  const [movieDetailsOpen, setMovieDetailsOpen] = useState(false);
  const [listOFMovies, setListOFMovies] = useState<Movie[] | null>(null)

  useEffect(() => {
    if (!movieDetailsOpen) setselectedMovie(null);
  }, [movieDetailsOpen]);

  useEffect(() => {
    if (selectedMovie) setMovieDetailsOpen(true);
  }, [selectedMovie]);

  useEffect(() => {    
    if (data?.searchMovies) setListOFMovies(data.searchMovies)
  }, [data])
  
  return (
    <Container component="main" maxWidth="md">
      
      <SearchForm getMovies={getMovies} />
      
      <Loading open={called && loading} />
      
      {error && (
        <Alert severity="error">
          <AlertTitle>{error.name}</AlertTitle>Something went wrong
        </Alert>
      )}
      
      {listOFMovies && (
        <ListOfMovies
          movies={listOFMovies!}
          setselectedMovie={setselectedMovie}
        />
      )}

      {selectedMovie && (
        <Box maxWidth="90%">
          <MovieDetails
            movie={selectedMovie!}
            open={movieDetailsOpen}
            setOpen={setMovieDetailsOpen}
            setListOFMovies={setListOFMovies}
          />
        </Box>
      )}
    </Container>
  );
};

export default App;
