import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  LayoutAnimation,
  UIManager,
  Dimensions
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

class Settings extends Component {
  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  logOutButton() {
    console.log("Hey");
    Actions.auth();
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Button
          style={styles.buttonStyle}
          title="Log Out"
          onPress={() => this.logOutButton()}
        />
      </SafeAreaView>
    );
  }
}
const styles = {
  mainContainer: {
    height: screenHeight,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  buttonStyle: {
    top: screenHeight * 0.8,
    flex: 1,
    marginTop: 5
  }
};

export default Settings;
