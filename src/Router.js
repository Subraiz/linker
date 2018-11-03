import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import Login from "./components/Login";
import SignUpFormGeneric from "./components/SignUpFormGeneric";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Login" component={Login} hideNavBar />
        <Scene
          key="SignUpFormGeneric"
          component={SignUpFormGeneric}
          title="Sign Up"
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
