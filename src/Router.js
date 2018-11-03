import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import Login from "./components/Login";
import LoginForm from "./components/LoginForm";
import SwipeView from "./components/SwipeView";
import SignUpFormGeneric from "./components/SignUpFormGeneric";
import SignUpFormStudent from "./components/SignUpFormStudent";
import SignUpFormRecruiter from "./components/SignUpFormRecruiter";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Login" initial component={Login} hideNavBar />
        <Scene
          key="LoginForm"
          component={LoginForm}
          title="Login"
        />
        <Scene
          key="SignUpFormGeneric"
          component={SignUpFormGeneric}
          title="Sign Up"
        />
        <Scene
          key="SignUpFormStudent"
          component={SignUpFormStudent}
          title="Student"
        />
        <Scene
          key="SignUpFormRecruiter"
          component={SignUpFormRecruiter}
          title="Recruiter"
        />

        <Scene
          key="SwipeView"
          component={SwipeView}
          hideNavBar
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
