import React from "react";
import { Scene, Router, Actions, ActionConst } from "react-native-router-flux";
import Login from "./components/Login";
import LoginForm from "./components/LoginForm";
import SwipeView from "./components/SwipeView";
import SignUpFormGeneric from "./components/SignUpFormGeneric";
import SignUpFormStudent from "./components/SignUpFormStudent";
import SignUpFormRecruiter from "./components/SignUpFormRecruiter";
import Settings from "./components/Settings";
import Matches from "./components/Matches";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="auth" hideNavBar initial>
          <Scene key="Login" component={Login} hideNavBar />
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
          <Scene
            key="Settings"
            component={Settings}
            hideNavBar={false}
            title="Prefrences"
          />
          <Scene
            key="Matches"
            component={Matches}
            hideNavBar={false}
            title="Matches"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
