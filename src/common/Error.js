import React, { Component } from "react";
import { Text } from "react-native";

export default class Error extends Component {
  render() {
    const error = this.props.value;
    if (!error) return null;
    return (
      <Text style={{color: 'red', margin: 10}} >{error}</Text>
    );
  }
}
