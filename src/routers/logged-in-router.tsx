import styled from 'styled-components';
import tw from 'twin.macro';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Restaurants from '../pages/restaurant/restaurants';
import NotFound from '../pages/404';
import Header from '../components/header';
import { useMe } from '../hooks/useMe';

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

const Login = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <Loading>
        <LoadingText>Loading...</LoadingText>
      </Loading>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && <ClientRouter />}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
