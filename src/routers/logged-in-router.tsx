import styled from "styled-components";
import tw from "twin.macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "../pages/restaurant/restaurants";
import NotFound from "../pages/404";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";

const Loading = styled.div`
  ${tw`h-screen flex justify-center items-center`}
`;

const LoadingText = styled.span`
  ${tw`font-medium text-xl tracking-wide`}
`;

// TODO 어떻게 이런식으로 사용할수있는건지 알아두어야 할거 같다
const ClientRouter = [
  <Route key={1} path='/' exact>
    <Restaurants />
  </Route>,
  <Route key={2} path='/confirm' exact>
    <ConfirmEmail />
  </Route>,
  <Route key={3} path="/edit-profile" exact>
    <EditProfile />
  </Route>
];

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
        {data.me.role === "Client" && ClientRouter}
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Login;
