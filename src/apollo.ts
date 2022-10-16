import { LOCALSTORAGE_TOKEN } from './constants';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';

const token = localStorage.getItem(LOCALSTORAGE_TOKEN);

export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authTokenVar() || '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              //  return Boolean(localStorage.getItem("token"));
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});
