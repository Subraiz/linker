import React, { Component } from "react";

import {
  View,
  Text,
  Image,
} from "react-native";
import { Card, Button } from "react-native-elements";

import Recruiter, { createFromObject } from "../models/Recruiter";

export default class RecruiterProfileView extends Component {
  render() {
    const { showMore, toggleShowMore } = this.props;
    const profile = createFromObject(this.props.profile);
    if (!profile) return null;
    return (
      <View style={styles.container}>
        <Card
          key={profile.getUid()}
          image={{ uri: profile.getImage() }}
          imageStyle={{ height: showMore ? 200 : 400 }}
        >
          <View style={styles.quickInfo}>
            <Text style={styles.school}>{profile.getCompanyName()}</Text>
            <Text style={styles.major}>{profile.getIndustry()}</Text>
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
                {profile.getCompanyDescription()}
              </Text>
              <Text style={styles.about}>
                {profile.getCompanyAddress()}
              </Text>
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
    height: 99999,
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
