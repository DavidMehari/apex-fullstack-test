import { useLazyQuery } from '@apollo/client';
import { Container } from '@mui/material';
import ListOfMovies from './components/ListOfMovies';
import Loading from './components/Loading';
import SearchForm from './components/SearchForm';
import { SEARCH_MOVIES } from './helpers/apollo';

const App = () => {
  const [getMovies, { called, loading, error, data }] = useLazyQuery(SEARCH_MOVIES);

  if (error) return <p>Something went wrong :(</p>;

  return (
    <Container component="main" maxWidth="md">
      <SearchForm getMovies={getMovies} />
      <Loading open={called && loading} />
      {data && <ListOfMovies movies={data.searchMovies} />}
    </Container>
  );
};

export default App;
