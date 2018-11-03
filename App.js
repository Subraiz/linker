import React, { Component } from "react";
import { Text, View, SafeAreaView } from "react-native";
import firebase from "@firebase/app";
import firestore from "@firebase/firestore";

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
    return (
      <SafeAreaView>
        <Text>Open up App.js to start working on your app!</Text>
      </SafeAreaView>
    );
  }
}
