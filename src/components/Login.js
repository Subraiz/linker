import React, { Component } from "react";
import { Platform } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  View,
  Text,
  TouchableOpacity,
} from "../common/shared-components";
import { Dimensions } from "react-native";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Login extends Component {
  selectButton = index => {
    if (index === 0) {

      // Go to sign up
    } else {
      Actions.SignUpFormGeneric();
      // Go to sign up
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainView}>
          <Text>Linker</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {this.selectButton(0);}}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.selectButton(1);}}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    height: screenHeight
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 30,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#000',
  },
};
