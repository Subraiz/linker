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
<<<<<<< HEAD
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
=======
import { Database } from "../models/Database";

import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import thumbs_up from "../assets/thumbs_up.png";
import thumbs_down from "../assets/thumbs_down.png";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
      forceSwipe: "",
    };

    if (this.props.user.userType && this.props.user.userType == USER.STUDENT) {
      this.getNextCandidate = () => {
        return Database.getNextRecruiter();
      };
      this.renderNextCard = (candidate) => {
        return this.renderRecruiterCard(candidate);
      };
    } else {
      this.getNextCandidate = () => {
        return Database.getNextStudent();
      };
      this.renderNextCard = (candidate) => {
        return this.renderStudentCard(candidate);
      };
    }

    this.renderNextCard = this.renderNextCard.bind(this);
    this.getNextCandidate = this.getNextCandidate.bind(this);
    this.setNextCandidate = this.setNextCandidate.bind(this);

    this.updateList = this.updateList.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b
  }

  componentDidUpdate() {
    this.getMatches();
  }

  componentWillUpdate() {
    this.getMatches();
  }

<<<<<<< HEAD
  async getMatches() {
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    firestore.settings({ timestampsInSnapshots: true });

    let matches = [];

    let userType = "Students";
    let currentUser = this.state.currentUser;
=======
  onSwipeLeft(candidate) {
    // TODO: update database
    this.updateList();
    this.setState({ forceSwipe: "" });
  }

  onSwipeRight(candidate) {
    // TODO: update database
    this.updateList();
    this.setState({ forceSwipe: "" });
  }
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b

    if (this.state.currentUser.userType == "Students") {
      userType = "Recruiters";
    }

<<<<<<< HEAD
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
=======
  renderStudentCard(candidate) {
    return (
      <Card
        key={candidate.getUid()}
        title={candidate.getName()}
        image={{ uri: candidate.getImage() }}
        imageStyle={{ height: 400 }}
      >
        <Text style={{ marginBottom: 10 }}>
          School: {candidate.getSchool()}
          Major: {candidate.getMajor()}
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b
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
<<<<<<< HEAD
          onSwipeRight={this.onSwipeRight.bind(this)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
=======
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          forceSwipe={this.state.forceSwipe}
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b
        />
        { candidates.length > 0 ?
          <View style={styles.swipeButtons}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ forceSwipe: "left" });
              }}
                style={[styles.swipeButton, {paddingTop: 7, paddingBottom: 3}]}
            >
              <Image
                source={thumbs_down}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ forceSwipe: "right" });
              }}
              style={[styles.swipeButton, {paddingTop: 3, paddingBottom: 7}]}
            >
              <Image
                source={thumbs_up}
                style={styles.buttonImage}
              />
            </TouchableOpacity>
          </View>
        : null }
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
    alignItems: "center",
    margin: 10,
    marginTop: screenHeight - 100,
  },
  swipeButton: {
    alignItems: "center",
    marign: 5,
    padding: 5,
    backgroundColor: "#fff", 
    borderWidth: 1,
    borderRadius: 100,
  },
  buttonImage: {
    width: 70,
    height: 70,
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

<<<<<<< HEAD
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};

=======
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView);
