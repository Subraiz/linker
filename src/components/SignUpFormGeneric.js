import React, { Component } from "react";
import { Text, View, LayoutAnimation, UIManager } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { TouchableOpacity } from "../common/shared-components";

export default class SignUpFormGeneric extends Component {
  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  selectButton = index => {
    if (index == 0) {
      Actions.SignUpFormStudent();
    } else {
      Actions.SignUpFormRecruiter();
    }
  };

  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={e => {
            console.log(e);
          }}
        />
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
        <View style={styles.selectMessageContainer}>
          <Text style={styles.selectMessage}>I am a...</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(0);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Recruiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  buttonsContainer: {
    flexDirection: "row",
    margin: 5
  },
  button: {
    flex: 1,
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
