import React, { Component } from "react";
import {
  Text,
  View,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  ScrollView
} from "react-native";
import {
  SearchBar,
  FormLabel,
  FormInput,
  FormValidationMessage,
  ButtonGroup
} from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

let nationalSchools = [
  "Amherst",
  "Boston College",
  "Boston University",
  "Harvard",
  "Massachussets Institute of Technology",
  "Babson",
  "Northeastern",
  "Rutgers",
  "Tufts",
  "Emerson"
];

nationalSchools = nationalSchools.sort();

export default class SignUpFormStudent extends Component {
  state = {
    schools: nationalSchools,
    skills: [],
    skillTitle: ""
  };

  updatedSkills(text) {
    this.setState({ skillTitle: text });

    let updatedSkills = [];
    text.trim();
    if (text.substring(text.length - 1) == ",") {
      updatedSkills = this.state.skills;
      updatedSkills.push(this.state.skillTitle);
      this.setState({ skills: updatedSkills, skillTitle: "" });
    }
  }

  componentDidUpdate(props) {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  renderSearchedSchools(e) {
    let newSchools = [];
    nationalSchools.forEach(school => {
      if (school.includes(e)) {
        newSchools.push(school);
      }
    });
    console.log(newSchools);
    this.setState({ schools: newSchools });
  }

  renderLabels(array) {
    return array.map(item => {
      return <Picker label={item} value={item} key={item} />;
    });
  }

  removeSkill(i) {
    let updatedPositions = this.state.skills.splice(i, 1);
    this.setState(updatedPositions);
  }

  renderSkills() {
    return this.state.skills.map((position, i) => {
      return (
        <TouchableOpacity
          key={position}
          onLongPress={this.removeSkill.bind(this, i)}
        >
          <View style={styles.skillContainer}>
            <Text>{position}</Text>
          </View>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.containerStyle}>
        <SearchBar
          showLoading
          placeholder="Search For School"
          onChangeText={this.renderSearchedSchools.bind(this)}
        />

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <Picker style={{ width: 300, alignSelf: "center" }}>
            {this.renderLabels(this.state.schools)}
          </Picker>
          <FormLabel>Major</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>GPA</FormLabel>
          <FormInput
            keyboardType="numeric"
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>About</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
          <FormLabel>Skills (Seperated By Commas)</FormLabel>
          <FormInput
            value={this.state.skillTitle}
            onChangeText={this.updatedSkills.bind(this)}
          />
          <View style={styles.skillsViewContainer}>{this.renderSkills()}</View>
        </KeyboardAwareScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={this.loginButton} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    height: "auto"
  },
  skillsViewContainer: { margin: 10 },
  skillContainer: {
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
