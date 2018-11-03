import React, { Component } from "react";
import { Text, View, Switch } from "react-native";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  ButtonGroup
} from "react-native-elements";

export default class SignUpFormGeneric extends Component {
  selectButton = index => {
    if (index == 0) {
      // Go to student sign up
    } else {
      // Go to recruiter sign up
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
        <View style={styles.buttonGroupsContainer}>
          <ButtonGroup
            onPress={this.selectButton}
            containerBorderRadius={0}
            innerBorderStyle={{ width: 10, color: "rgba(0,0,0,.5)" }}
            buttons={["Student", "Recruiter"]}
            containerStyle={{ height: 60 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonGroupsContainer: {},
  selectMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 10
  },
  selectMessage: {
    fontFamily: "Gill Sans",
    fontSize: 20
  }
};
