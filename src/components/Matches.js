import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  UIManager,
  LayoutAnimation,
  WebView,
  Linking
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { Avatar, Icon } from "react-native-elements";
import { bindActionCreators } from "redux";
import { fetchMatches } from "../actions/MatchActions";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const MatchView = props => {
  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.matchCardStyle}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 80, height: 80 }}
            source={{
              uri:
                props.image ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
            }}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.fontStyle}>{props.name}</Text>
          <Text style={styles.fontStyle}>{props.school}</Text>
          <Text style={styles.fontStyle}>{props.major}</Text>
        </View>
        <TouchableOpacity
          style={styles.moreInfo}
          onPress={() => {
            Actions.MainWebView({ website: props.address });
          }}
        >
          <View style={styles.moreInfo}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../images/arrow.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

class Matches extends Component {
  componentWillMount() {
    count = 1;
  }

  componentDidMount() {
    this.props.fetchMatches(this.props.user);
  }

  componentDidUpdate() {
    if (count > 0) {
      this.props.fetchMatches(this.props.user);
      count = count - 1;
    }

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  openWebsite(website) {
    console.log(website);
  }

  renderMatches() {
    let image = "";
    if (this.props.matches.length > 0) {
      return this.props.matches.map((match, index) => {
        if (match.image) {
          image = match.image;
        } else {
          image = "https://png.pngtree.com/svg/20161217/avatar__181424.png";
        }
        return (
          <View key={match.uid}>
            <MatchView
              address={match.companyAddress}
              image={image}
              name={match.name}
              school={match.school || match.companyName}
              major={match.major || match.industry}
            />
          </View>
        );
      });
    }
  }

  render() {
    console.log(this.props.matches);
    return <ScrollView>{this.renderMatches()}</ScrollView>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    matches: state.match.matches
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchMatches: fetchMatches
    },
    dispatch
  );
};

const styles = {
  matchContainerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
    position: "relative",
    top: 10
  },
  matchCardStyle: {
    alignSelf: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,.4)",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
    marignTop: 5,
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: screeWidth * 0.95,
    height: screenHeight * 0.15
  },
  descriptionContainer: {
    paddingLeft: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  fontStyle: {
    fontSize: 20,
    textAlign: "center"
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  moreInfo: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  moreInfoText: {
    fontSize: 32
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Matches);
