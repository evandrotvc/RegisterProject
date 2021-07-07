import React from "react";

import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// privado && logado -> ok
// n privado && n logado -> ok
// eh privado && n logado -> redirecionar para login
// n privado && logado -> redirecionar para dashboard
const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth(); // dados do user logado

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? "/" : "dashboard",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
