import React, { Component } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  ButtonGroup,
} from "../common/shared-components";
import { Dimensions } from "react-native";

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
        <View style={styles.mainView}>
          <Text>Linker</Text>
        </View>
        <View style={styles.loginButtons}>
          <ButtonGroup
            onPress={this.selectButton}
            buttons={["Login", "Signup"]}
            innerBorderStyle={{ width: 10, color: "#fff" }}
            containerBorderRadius={0}
            containerStyle={{ height: 100, borderWidth: 0 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    height: screenHeight,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginButtons: {
    height: 100,
    width: '100%',
  }
};
