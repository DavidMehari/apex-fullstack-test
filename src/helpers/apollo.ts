import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/grphql',
  cache: new InMemoryCache(),
});
