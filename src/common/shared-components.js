import React, { Component } from "react";
import {
  View as RView,
  Text as RText,
  TouchableOpacity as RTouchableOpacity,
} from "react-native";
import {
  FormLabel as RFormLabel,
  FormInput as RFormInput,
  FormValidationMessage as RFormValidationMessage
} from "react-native-elements";

export const View = props => <RView {...props}>{props.children}</RView>;

export const TouchableOpacity = props => <RTouchableOpacity {...props}>{props.children}</RTouchableOpacity>;

export const ButtonGroup = props => (
  <RButtonGroup {...props}>{props.children}</RButtonGroup>
);

export const Button = props => (
  <RButton {...props}>{props.children}</RButton>
);

export const FormLabel = props => {
  <RFormLabel {...props}>{props.children}</RFormLabel>;
};

export const FormInput = props => {
  <RFormInput {...props}>{props.children}</RFormInput>;
};

export const FormValidationMessage = props => {
  <RFormValidationMessage {...props}>{props.children}</RFormValidationMessage>;
};

export const Text = props => <RText {...props}>{props.children}</RText>;
