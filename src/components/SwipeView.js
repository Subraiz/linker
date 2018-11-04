import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button, Card } from "react-native-elements";
import Deck from "./Deck";

const DATA = [
  {
    id: 1,
    text: "Thair Brown",
    major: "Economcis & Computer Science",
    uri:
      "https://media.licdn.com/dms/image/C5603AQG36a9Pawjo8w/profile-displayphoto-shrink_800_800/0?e=1545264000&v=beta&t=yC3YctzMRFevKXHJ7SHF_4rBjK1iWr4O6BRaygm-NYc"
  },
  {
    id: 2,
    text: "Subraiz Ahmed",
    major: "Computer Science & Economics",
    uri:
      "https://pbs.twimg.com/profile_images/963415542290898944/8nMSf6ib_400x400.jpg"
  },
  {
    id: 3,
    text: "Card #3",
    major: "",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 4,
    text: "Card #4",
    major: "",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  },
  {
    id: 5,
    text: "Card #5",
    major: "",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 6,
    text: "Card #6",
    major: "",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 7,
    text: "Card #7",
    major: "",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 8,
    text: "Card #8",
    major: "",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  }
];

class SwipeView extends React.Component {
  renderCard(item) {
    return (
      <Card key={item.id} title={item.text} image={{ uri: item.uri }}>
        <Text style={{ marginBottom: 10 }}>{item.major}</Text>
        <Button
          icon={{ name: "assignment" }}
          backgroundColor="#03A9F4"
          title="View Resume"
        />
      </Card>
    );
  }

  renderNoMoreCards() {
    console.log("All done");
    return (
      <Card title={"All Done"}>
        <Button
          icon={{ name: "assignment" }}
          backgroundColor="#03A9F4"
          title="Get More"
        />
      </Card>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};

export default SwipeView;
