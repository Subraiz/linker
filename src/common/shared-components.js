import React, { Component } from "react";
import { View as RView } from "react-native";
import { ButtonGroup as RNEButtonGroup } from "react-native-elements";

const View = props => <RView {...props}>{props.children}</RView>;

const ButtonGroup = props => (
  <RNEButtonGroup {...props}>{prop.children}</RNEButtonGroup>
);

export default {
  View,
  ButtonGroup
};
