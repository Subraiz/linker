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

export default class SignUpFormStudent extends Component {
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
          <FormLabel>Positions Available</FormLabel>
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
