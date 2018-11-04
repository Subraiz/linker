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
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Card, Button, Header } from "react-native-elements";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class SwipeView extends Component {
  state = {
    forceSwipe: "",
    currentUser: this.props.user
  };
  componentWillMount() {
    this.props.queryUsers(this.state.currentUser);
    this.getMatches();
  }

  componentDidUpdate() {
    //this.props.queryUsers(this.state.currentUser);
  }

  onSwipeRight(candidate) {
    this.props.onSwipeRight(this.state.currentUser, candidate);
    this.getMatches();
    // this.props.queryUsers(this.state.currentUser);
    // this.setState({});
  }

  onSwipeLeft(candidate) {
    this.props.onSwipeLeft(this.state.currentUser, candidate);
    this.getMatches();
    // this.props.queryUsers(this.state.currentUser);
    // this.setState({});
  }

  rightButtonHelper() {
    Actions.Matches({ currentUser: this.state.currentUser });
  }

  leftButtonHelper() {
    Actions.Settings();
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

  renderCard(user) {
    return (
      <Card key={user.uid} title={user.name}>
        <Text style={{ marginBottom: 10 }}>
          {user.school || user.companyName}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {user.major || user.companyAddress}
        </Text>
      </Card>
    );
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
              onPress: this.rightButtonHelper.bind(this),
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

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  swipeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: screenHeight,
    position: "absolute",
    width: screeWidth,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  swipeButton: {
    alignItems: "center",
    marign: 5,
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 100
  },
  buttonImage: {
    width: 70,
    height: 70
  }
};

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView);
