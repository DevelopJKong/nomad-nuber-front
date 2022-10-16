import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import tw from 'twin.macro';
import { isLoggedInVar } from '../apollo';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { meQuery } from '../__generated__/meQuery';
import Restaurants from '../pages/restaurant/restaurants';
import NotFound from '../pages/404';
import Header from '../components/header';

const Loading = styled.div`
  ${tw`h-screen flex justify-center items-center`}
`;

const LoadingText = styled.span`
  ${tw`font-medium text-xl tracking-wide`}
`;

const ClientRouter = () => (
  <Route path='/' exact>
    <Restaurants />
  </Route>
);

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const Login = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  if (!data || loading || error) {
    return (
      <Loading>
        <LoadingText>Loading...</LoadingText>
      </Loading>
    );
  }
  return (
    <Router>
      <Switch>
        <Header />
        {data.me.role === 'Client' && <ClientRouter />}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
