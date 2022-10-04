import { gql, useLazyQuery } from '@apollo/client';
import { Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ListOfMovies from './components/ListOfMovies';
import SearchForm from './components/SearchForm';

export const SEARCH_MOVIES = gql`
  query SearchMovies($searchQuery: String!) {
    searchMovies(query: $searchQuery) {
      id
      name
      overview
    }
  }
`;

const App = () => {
  const [getMovies, { called, loading, error, data }] = useLazyQuery(SEARCH_MOVIES);

  if (error) return <p>Something went wrong :(</p>;

  return (
    <Container component="main" maxWidth="md">
      <SearchForm getMovies={getMovies} />
      {called && loading && <CircularProgress />}
      {data && <ListOfMovies movies={data.searchMovies} />}
    </Container>
  );
};

export default App;
