import React, { Component } from "react";
import { Text, View, Picker, KeyboardAvoidingView } from "react-native";
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
    schools: nationalSchools
  };

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

  render() {
    return (
      <View>
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
          <FormLabel>Skills</FormLabel>
          <FormInput
            onChangeText={e => {
              console.log(e);
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
