import React, { Component } from "react";
import firebase from "@firebase/app";
require("firebase/auth");
import Deck from "./Deck";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  queryUsers,
  onSwipeRight,
  onSwipeLeft,
  getMatches,
  updateMatches
} from "../actions/DeckActions";
import { Actions } from "react-native-router-flux";
import { Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Database } from "../models/Database";
import md5 from "react-native-md5";
import { Card, Button, Header } from "react-native-elements";

class SwipeView extends Component {
  state = {
    currentUser: this.props.user
  };
  componentWillMount() {
    this.getMatches();
    console.log(this.state.currentUser);
    this.props.queryUsers(this.state.currentUser);
  }

  componentDidUpdate() {
    this.getMatches();
  }

  componentWillUpdate() {
    this.getMatches();
  }

  async getMatches() {
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    firestore.settings({ timestampsInSnapshots: true });

    let matches = [];

    let userType = "Students";
    let currentUser = this.state.currentUser;

    if (this.state.currentUser.userType == "Students") {
      userType = "Recruiters";
    }

    await firestore.collection(userType).onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        candidate = doc.data();
        console.log(candidate.uid);
        console.log(currentUser.liked);
        if (
          candidate.liked.includes(currentUser.uid) &&
          currentUser.liked.includes(candidate.uid)
        ) {
          console.log("We have found a match");
          matches.push(candidate);
        }
      });

      console.log("These are the matches: ", matches);
      this.props.updateMatches(currentUser, matches);
    });
  }

  renderCard(user) {
    return (
      <Card key={user.uid} title={user.name}>
        <Text style={{ marginBottom: 10 }}>
          {user.school || user.companyName}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {user.major || user.companyAddress}
        </Text>
        <Button
          icon={{ name: "assignment" }}
          backgroundColor="#03A9F4"
          title="View Resume"
        />
      </Card>
    );
  }

  onSwipeRight(candidate) {
    this.props.onSwipeRight(this.state.currentUser, candidate);
    this.getMatches();
  }

  onSwipeLeft(candidate) {
    this.props.onSwipeLeft(this.state.currentUser, candidate);
    this.getMatches();
  }

  renderNoMoreCards() {
    return (
      <View>
        <Card title={"All Done"}>
          <Button
            onPress={this.getMatches}
            icon={{ name: "refresh" }}
            backgroundColor="#03A9F4"
            title="Refresh"
          />
        </Card>
      </View>
    );
  }

  rightButtonHelper() {
    console.log("Go to matches");
  }

  leftButtonHelper() {
    Actions.Settings();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Header
            leftComponent={{
              icon: "settings",
              color: "#fff",
              onPress: this.leftButtonHelper
            }}
            centerComponent={{
              text: "Linker",
              style: { fontSize: 30, color: "#fff" }
            }}
            rightComponent={{
              icon: "message",
              onPress: this.rightButtonHelper,
              color: "#fff"
            }}
          />
        </View>
        <Deck
          data={this.props.list}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={this.onSwipeRight.bind(this)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    list: state.deck.list,
    matches: state.deck.matches
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      queryUsers: queryUsers,
      onSwipeRight: onSwipeRight,
      onSwipeLeft: onSwipeLeft,
      getMatches: getMatches,
      updateMatches: updateMatches
    },
    dispatch
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView);
