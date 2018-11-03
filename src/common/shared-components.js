import React, { Component } from "react";
import {
  View as RView,
  Text as RText,
} from "react-native";
import { ButtonGroup as RNEButtonGroup } from "react-native-elements";

export const View = props => (
  <RView {...props}>{props.children}</RView>
);

export const Text = props => (
  <RText {...props}>{props.children}</RText>
);

export const ButtonGroup = props => (
  <RNEButtonGroup {...props}>{props.children}</RNEButtonGroup>
);
