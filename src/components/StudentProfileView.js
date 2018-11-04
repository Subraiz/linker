import React, { Component } from "react";

import {
  View,
  Text,
  Image,
} from "react-native";
import { Card, Button } from "react-native-elements";

import Student, { createFromObject } from "../models/Student";

export default class StudentProfileView extends Component {
  render() {
    const { showMore, toggleShowMore } = this.props;
    console.log(">>>>>>>");
    console.log(this.props.profile);
    const profile = createFromObject(this.props.profile);
    console.log(profile);
    console.log("<<<<<<<");
    return (
      <View style={styles.container}>
        <Card
          key={profile.getUid()}
          image={{ uri: profile.getImage() }}
          title={profile.getName()}
          imageStyle={{ height: 400 }}
        >
          <View style={styles.quickInfo}>
            <Text style={styles.school}>{profile.getSchool()}</Text>
            <Text style={styles.major}>{profile.getMajor()}</Text>
          </View>
          <Button
            icon={{ name: "assignment" }}
            backgroundColor="#03A9F4"
            onPress={toggleShowMore}
            title={showMore ? "Hide" : "View More"}
          />
          { showMore ? (
            <View style={styles.longInfo}>
              <Text style={styles.about}>
                {profile.getAbout()}
              </Text>
              <View style={styles.row}>
                <Text style={styles.key}>GPA</Text>
                <Text style={styles.value}>{profile.getGPA()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.key}>Skills</Text>
                <Text style={styles.value}>{profile.getSkills()}</Text>
              </View>
            </View>
          ) : null }
        </Card>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  quickInfo: {
  },
  school: {
    fontWeight: "bold",
  },
  major: {
  },
  longInfo: {
  },
  about: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "spread-between",
    alignContent: "flex-start",
  },
  key: {
    fontWeight: "bold",
  },
  value: {
  },
};
