import React from "react";

import { Switch } from "react-router-dom";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import EditUser from "../pages/EditUser";
import Route from "./Route";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/edit" component={EditUser} isPrivate />
    </Switch>
  );
};

export default Routes;
