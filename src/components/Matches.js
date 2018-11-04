import React, { Component } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchLatestUser, fetchMatches } from "../actions/MatchActions";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MatchView = props => {
  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.matchCardStyle}>
        <Text>Testing</Text>
      </View>
    </View>
  );
};

class Matches extends Component {
  count;
  componentWillMount() {
    count = 1;
    this.props.fetchLatestUser(this.props.currentUser);
  }

  componentDidUpdate() {
    if (count > 0) {
      this.props.fetchMatches(this.props.user);
      count = count - 1;
    }
  }

  renderMatches() {
    if (this.props.matches.length > 0) {
      return this.props.matches.map((match, index) => {
        return (
          <View key={match.uid}>
            <MatchView />
          </View>
        );
      });
    }
  }

  render() {
    console.log(this.props.matches);
    return <View>{this.renderMatches()}</View>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.match.user,
    matches: state.match.matches
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchLatestUser: fetchLatestUser,
      fetchMatches: fetchMatches
    },
    dispatch
  );
};

const styles = {
  matchContainerStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20
  },
  matchCardStyle: {
    backgroundColor: "white",
    marignTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    width: screeWidth,
    height: screenHeight * 0.1
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);
