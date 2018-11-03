import React, { Component } from "react";
import { Switch } from "react-native";
import { Actions } from "react-native-router-flux";
import { Text, View, TouchableOpacity } from "../common/shared-components";
import { Database } from "../models/Database";

export default class SwipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const nextStudent = Database.getNextStudent();
    this.setState({ user: nextStudent });
  }

  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <View>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
    );
  }
}
