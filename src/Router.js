import React from "react";
import { Scene, Router, Actions, ActionConst } from "react-native-router-flux";
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
        <Scene key="auth" hideNavBar>
          <Scene key="Login" component={Login} initial hideNavBar />
          <Scene
            key="SignUpFormGeneric"
            component={SignUpFormGeneric}
            title="Sign Up"
            hideNavBar={false}
          />
          <Scene
            key="SignUpFormStudent"
            component={SignUpFormStudent}
            title="Student"
            hideNavBar={false}
          />
          <Scene
            key="SignUpFormRecruiter"
            component={SignUpFormRecruiter}
            title="Recruiter"
            hideNavBar={false}
          />
          <Scene
            key="LoginForm"
            component={LoginForm}
            title="Login"
            hideNavBar={false}
          />
        </Scene>
        <Scene key="swipe" hideNavBar type={ActionConst.RESET}>
          <Scene key="SwipeView" component={SwipeView} />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
