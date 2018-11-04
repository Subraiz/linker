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
import StudentProfileView from "./StudentProfileView";
import RecruiterProfileView from "./RecruiterProfileView";

import thumbs_up from "../assets/thumbs_up.png";
import thumbs_down from "../assets/thumbs_down.png";

import Student from "../models/Student";
import Recruiter, { createFromObject } from "../models/Recruiter";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class SwipeView extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      candidates: [],
      forceSwipe: "",
      showMore: false,
    };

    this.renderCard = this.renderCard.bind(this);
    this.onSwipeLeft = this.onSwipeLeft.bind(this);
    this.onSwipeRight = this.onSwipeRight.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
  }

  componentWillMount() {
    this.props.queryUsers(this.props.user);
    this.getMatches();
  }

  componentDidUpdate() {
    // this.getMatches();
    //this.props.queryUsers(this.state.currentUser);
  }

  onSwipeRight(candidate) {
		this.props.list.shift();
    this.props.onSwipeRight(this.props.user, candidate);
    this.setState({ forceSwipe: "" });
    //this.getMatches();
  }

  onSwipeLeft(candidate) {
		this.props.list.shift();
    this.props.onSwipeLeft(this.props.user, candidate);
    this.setState({ forceSwipe: "" });
    //this.getMatches();
  }

  toggleShowMore() {
    this.setState({ showMore: !this.state.showMore });
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

  renderCard(user, isFront = false) {
    // TODO: differentiate rendering between student and recruiter
    console.log("RENDER");
    console.log(user);
    if (!user) return null;
    return (
      <RecruiterProfileView profile={user} showMore={isFront && this.state.showMore} toggleShowMore={this.toggleShowMore} />
    );
  }

  async getMatches(resetStates = false) {
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    firestore.settings({ timestampsInSnapshots: true });

    let matches = [];

    let userType = "Students";
    let currentUser = this.props.user;

    if (currentUser.userType == "Students") {
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
          forceSwipe={this.state.forceSwipe}
          showMore={this.state.showMore}
        />
        { this.props.list.length > 0 && !this.state.showMore ? (
          <View style={styles.swipeButtons}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ forceSwipe: "left" });
              }}
              style={[styles.swipeButton, { paddingTop: 7, paddingBottom: 3 }]}
            >
              <Image source={thumbs_down} style={styles.buttonImage} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ forceSwipe: "right" });
              }}
              style={[styles.swipeButton, { paddingTop: 3, paddingBottom: 7 }]}
            >
              <Image source={thumbs_up} style={styles.buttonImage} />
            </TouchableOpacity>
          </View>
        ) : null }
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
