import React, { Component } from "react";
import { Text, View, Switch } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { TouchableOpacity } from "../common/shared-components";

export default class LoginForm extends Component {
  loginButton = () => {
    Actions.swipe();
  };

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={e => {
            console.log(e);
          }}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          onChangeText={e => {
            console.log(e);
          }}
        />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.loginButton} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },
  button: {
    width: "50%",
    alignItems: "center",
    margin: 5,
    padding: 30,
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "#000"
  },
  selectMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 10
  },
  selectMessage: {
    fontSize: 20
  }
};
