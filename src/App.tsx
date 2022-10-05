import { useLazyQuery } from '@apollo/client';
import { Alert, AlertTitle, Container } from '@mui/material';
import ListOfMovies from './components/ListOfMovies';
import Loading from './components/Loading';
import SearchForm from './components/SearchForm';
import { SEARCH_MOVIES } from './helpers/apollo';

const App = () => {
  const [getMovies, { called, loading, error, data }] = useLazyQuery(SEARCH_MOVIES);

  return (
    <Container component="main" maxWidth="md">
      <SearchForm getMovies={getMovies} />
      <Loading open={called && loading} />
      {error &&  <Alert severity="error"><AlertTitle>{error.name}</AlertTitle>Something went wrong</Alert>}
      {data && <ListOfMovies movies={data.searchMovies} />}
    </Container>
  );
};

export default App;
