import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Error,
  Register,
  Login,
  Dashboard,
  ProtectedRoute,
} from "./pages";
import Navbar from "./components/Navbar";

const routes = [
  { path: "/", Component: Home, exact: true },
  { path: "/login", Component: Login, exact: true },
  { path: "/register", Component: Register, exact: true },
  { path: "/dashboard", Component: Dashboard, exact: true, isProtected: true },
  { path: "*", Component: Error },
];

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {routes.map(({ isProtected, path, Component, exact }, index) => {
          const RouteComponent = isProtected ? ProtectedRoute : Route;

          return (
            <RouteComponent key={index} path={path} exact={exact}>
              <Component />
            </RouteComponent>
          );
        })}
      </Switch>
    </Router>
  );
};

export default App;
