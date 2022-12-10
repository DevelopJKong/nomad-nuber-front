import styled from "styled-components";
import tw from "twin.macro";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Restaurants from "../pages/restaurant/restaurants";
import NotFound from "../pages/404";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import ConfirmEmail from "../pages/user/confirm-email";
import EditProfile from "../pages/user/edit-profile";
import { Search } from "../pages/restaurant/search";
import Category from "../pages/restaurant/category";
import Restaurant from "../pages/restaurant/restaurant";
import { MyRestaurants } from "../pages/owner/my-restaurants";
import AddRestaurants from "../pages/owner/add-restaurants";
import { MyRestaurant } from "../pages/owner/my-restaurant";
import AddDish from "../pages/owner/add-dish";
import Order from "../pages/order";
import Dashboard from "../pages/driver/dashboard";
import { UserRole } from "../__generated__/globalTypes";

const Loading = styled.div`
   ${tw`h-screen flex justify-center items-center`}
`;

const LoadingText = styled.span`
   ${tw`font-medium text-xl tracking-wide`}
`;

const clientRoutes = [
   { path: "/", component: <Restaurants /> },
   { path: "/search", component: <Search /> },
   { path: "/category/:slug", component: <Category /> },
   { path: "/restaurants/:id", component: <Restaurant /> },
];

const commonRoutes = [
   { path: "/confirm", component: <ConfirmEmail /> },
   { path: "/edit-profile", component: <EditProfile /> },
   { path: "/orders/:id", component: <Order /> },
];

const restaurantRoutes = [
   { path: "/", component: <MyRestaurants /> },
   { path: "/add-restaurant", component: <AddRestaurants /> },
   { path: "/restaurants/:id", component: <MyRestaurant /> },
   { path: "/restaurants/:restaurantId/add-dish", component: <AddDish /> },
];

const driversRouter = [{ path: "/", component: <Dashboard /> }];

const LoggedInRouter = () => {
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
            {data.me.role === UserRole.Client &&
               clientRoutes.map((route) => (
                  <Route exact key={route.path} path={route.path}>
                     {route.component}
                  </Route>
               ))}
            {data.me.role === UserRole.Delivery &&
               driversRouter.map((route) => (
                  <Route exact key={route.path} path={route.path}>
                     {route.component}
                  </Route>
               ))}

            {data.me.role === UserRole.Owner &&
               restaurantRoutes.map((route) => (
                  <Route exact key={route.path} path={route.path}>
                     {route.component}
                  </Route>
               ))}
            {commonRoutes.map((route) => (
               <Route exact key={route.path} path={route.path}>
                  {route.component}
               </Route>
            ))}
            <Route path='*'>
               <NotFound />
            </Route>
         </Switch>
      </Router>
   );
};

export default LoggedInRouter;
