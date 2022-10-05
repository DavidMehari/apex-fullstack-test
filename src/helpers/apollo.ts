import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/grphql',
  cache: new InMemoryCache(),
});

export const SEARCH_MOVIES = gql`
  query SearchMovies($searchQuery: String!) {
    searchMovies(query: $searchQuery) {
      id
      name
      overview
      score
      socialMedia {
        imdb
      }
      poster {
        tiny
        large
      }
    }
  }
`;