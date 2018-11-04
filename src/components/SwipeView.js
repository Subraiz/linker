import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Button, Card } from "react-native-elements";
import Deck from "./Deck";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { queryUsers } from "../actions/DeckActions";

import { Actions } from "react-native-router-flux";
import { Text, View, TouchableOpacity } from "../common/shared-components";
import { Database } from "../models/Database";
import md5 from "react-native-md5";

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
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
  }

  setNextCandidate(candidate) {
    let { candidates } = this.state.candidates;
    candidates.push(candidate);
    this.setState({ candidates });
  }

  componentDidMount() {
    this.props.queryUsers(this.props.user)
    this.setState({ candidates: this.props });
  }

  onSwipeLeft(candidate) {
    // TODO: update database
    this.updateList();
  }

  onSwipeRight(candidate) {
    // TODO: update database
    this.updateList();
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

  getGravatarUri(email) {
    return "https://www.gravatar.com/avatar/" + md5.hex_md5(email.toLowerCase().trim()) + "?s=300";
  }

  renderStudentCard(candidate) {
    return (
      <Card
        key={candidate.uid}
        title={candidate.name}
        image={{ uri: this.getGravatarUri(candidate.email) }}
        imageStyle={{ height: 400 }}
      >
        <Text style={{ marginBottom: 10 }}>
          School: {candidate.school}
          Major: {candidate.major}
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
      <SafeAreaView style={styles.container}>
        <Deck
          data={candidates}
          renderCard={this.renderNextCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      queryUsers: queryUsers
    },
    dispatch
  );
};

const styles = {

<<<<<<< HEAD
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeView);
=======
};
>>>>>>> 1b719f759aa6a7e1422847163ae2380e64e9609e
