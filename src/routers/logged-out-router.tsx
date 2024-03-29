import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../pages/404";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";

const LoggedOutRouter = () => {
   return (
      <Router>
         <Switch>
            <Route path='/create-account'>
               <CreateAccount />
            </Route>
            <Route path='/' exact>
               <Login />
            </Route>
            <Route>
               <NotFound />
            </Route>
         </Switch>
      </Router>
   );
};

export default LoggedOutRouter;
