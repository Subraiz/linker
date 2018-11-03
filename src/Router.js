import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import Login from "./components/Login";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" initial>
          <Scene key="Login" component={Login} title="Please Login" />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
