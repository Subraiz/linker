import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import firebase from "@firebase/app";
import firestore from "@firebase/firestore";
import Router from "./src/Router.js";

export default class App extends Component {
  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDslbyKmE9rzURUqntUoDHXgPZeiTOHZJw",
      authDomain: "linker-e1bcb.firebaseapp.com",
      databaseURL: "https://linker-e1bcb.firebaseio.com",
      projectId: "linker-e1bcb",
      storageBucket: "linker-e1bcb.appspot.com",
      messagingSenderId: "35318609292"
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
