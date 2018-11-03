import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager
} from "react-native";
import {
  SearchBar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  ButtonGroup
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class SignUpFormStudent extends Component {
  state = {
    positions: [],
    positionTitle: ""
  };

  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  updatedPositions(text) {
    this.setState({ positionTitle: text });

    let updatedPositions = [];
    text.trim();
    if (text.substring(text.length - 1) == ",") {
      updatedPositions = this.state.positions;
      updatedPositions.push(this.state.positionTitle);
      this.setState({ positions: updatedPositions, positionTitle: "" });
      console.log(this.state.positions);
    }
  }

  removePosition(i) {
    let updatedPositions = this.state.positions.splice(i, 1);
    this.setState(updatedPositions);
  }

  renderPositions() {
    return this.state.positions.map((position, i) => {
      return (
        <TouchableOpacity
          key={position}
          onLongPress={this.removePosition.bind(this, i)}
        >
          <View style={styles.positionContainer}>
            <Text>{position}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <FormLabel>Company Name</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>Company Address</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>Industry</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>Company Description</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>Positions Available (Seperated By Comma)</FormLabel>
          <FormInput
            value={this.state.positionTitle}
            onChangeText={this.updatedPositions.bind(this)}
          />
          <View style={styles.positionsViewContainer}>
            {this.renderPositions()}
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.loginButton} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  positionsViewContainer: { margin: 15 },
  positionContainer: {
    marginTop: 5,
    backgroundColor: "white",
    height: "auto",
    width: 100,
    padding: 7,
    shadowOffset: { width: 0.2, height: 0.2 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    alignItems: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },
  button: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgb(45, 45, 128)",

    alignItems: "center",
    margin: 5,
    padding: 10,
    backgroundColor: "rgba(45, 45, 128, 0)"
  },
  buttonText: {
    color: "#000"
  }
};
