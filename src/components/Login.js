import React, { Component } from "react";
import { Platform } from "react-native";
// import { View, ButtonGroup } from "../common/shared-components";
import { View, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Login extends Component {
  selectButton = index => {
    if (index === 0) {
      // Go to login
    } else {
      // Go to sign up
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginButtons}>
          <ButtonGroup
            onPress={this.selectButton}
            buttons={["Login", "Signup"]}
            containerStyle={{ height: 60 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingTop: Platform.OS == "ios" ? 20 : 0,
    height: screenHeight,
    paddingBottom: 20
  },
  loginButtons: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  }
};
