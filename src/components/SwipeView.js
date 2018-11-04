import React, { Component } from "react";
import { Card, Button } from "react-native-elements";
import Deck from "./Deck";

import { Actions } from "react-native-router-flux";
import { Text, View, TouchableOpacity } from "../common/shared-components";
import { Database } from "../models/Database";

import { Image, Dimensions } from "react-native";

import thumbs_up from "../assets/thumbs_up.png";
import thumbs_down from "../assets/thumbs_down.png";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      candidates: [],
      forceSwipe: "",
    };

    if (props.userType && props.userType == USER.STUDENT) {
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
  }

  setNextCandidate(candidate) {
    let { candidates } = this.state.candidates;
    candidates.push(candidate);
    this.setState({ candidates });
  }

  componentDidMount() {
    let { candidates } = this.state;
    for (let i = 0; i < 5; i++) {
      const nextCandidate = this.getNextCandidate();
      if (!nextCandidate) {
        // render last card view
      } else {
        candidates.push(nextCandidate);
      }
    }
    this.setState({ candidates });
  }

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

  updateList() {
    let { candidates } = this.state;
    const nextCandidate = this.getNextCandidate();
    if (!nextCandidate) {
      // render last card view
    } else {
      candidates.push(nextCandidate);
    }
    candidates.shift();
    this.setState({ candidates });
  }

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
        </Text>
        <Button
          icon={{ name: "assignment" }}
          backgroundColor="#03A9F4"
          title="View More"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    console.log("All done");
    return (
      <Card title={"All Done"}>
        <Button
          icon={{ name: "assignment" }}
          backgroundColor="#03A9F4"
          title="Get More"
        />
      </Card>
    );
  }

  renderRecruiterCard(candidate) {
    return (
      <Text>{candidate.name}</Text>
    );
  }

  render() {
    const { user, candidates } = this.state;
    console.log(user);
    return (
      <View style={styles.container}>
        <Deck
          data={candidates}
          renderCard={this.renderNextCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          forceSwipe={this.state.forceSwipe}
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
      </View>
    );
  }
}

const styles = {
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
