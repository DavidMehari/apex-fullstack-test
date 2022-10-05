import { ApolloClient, DefaultOptions, gql, InMemoryCache } from '@apollo/client';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/grphql',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export const SEARCH_MOVIES = gql`
  query SearchMovies($searchQuery: String!) {
    searchMovies(query: $searchQuery) {
      id
      name
      overview
      score
      poster {
        tiny
        large
      }
    }
  }
`;
