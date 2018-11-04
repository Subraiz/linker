import React, { Component } from "react";
import {
  Platform,
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Actions } from "react-native-router-flux";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class Login extends Component {
  selectButton = index => {
    if (index === 0) {
      Actions.LoginForm();
      // Go to sign up
    } else {
      Actions.SignUpFormGeneric();
      // Go to sign up
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainerStyle}>
          <Image
            style={styles.imageStyle}
            source={require("../images/wallpaper.jpg")}
          />
        </View>
        <View style={styles.mainView}>
          <Image source={require("../images/linkerLogo.png")} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(0);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
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
    justifyContent: "space-between"
  },
  buttonsContainer: {
    flexDirection: "row",
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 30,
    backgroundColor: "rgba(99, 149, 242, .75)",
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.5
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "400"
  },
  imageStyle: {
    zIndex: -1,
    position: "absolute",
    height: screenHeight,
    width: screeWidth * 3
  },
  imageContainerStyle: {
    display: "flex",
    alignItems: "center",
    left: 20
  }
};
