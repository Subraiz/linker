import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  UIManager
} from "react-native";
import { Header } from "react-native-elements";

const screeWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const swipeThreshold = 0.32 * screeWidth;
const swipeOutDuration = 400;

class Deck extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dx > swipeThreshold) {
          this.forceSwipe("right");
        } else if (gesture.dx < -swipeThreshold) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  forceSwipe(direction) {
    const directionWeight = direction === "right" ? 1.5 : -1.5;
    Animated.timing(this.state.position, {
      toValue: { x: directionWeight * screeWidth, y: 0 },
      duration: swipeOutDuration
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const user = data[this.state.index];
    direction === "right" ? onSwipeRight(user) : onSwipeLeft(user);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-screeWidth * 2.5, 0, screeWidth * 2.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }]
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return (
        <Animated.View style={styles.cardStyle}>
          {this.props.renderNoMoreCards()}
        </Animated.View>
      );
    }
<<<<<<< HEAD
=======

    if (this.props.data.length === 1) {
      return [
        (
          <Animated.View style={styles.cardStyle}>
            {this.props.renderNoMoreCards()}
          </Animated.View>
        ), (
          <Animated.View
            key={this.props.data[0].getUid()}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(this.props.data[0])}
          </Animated.View>
        )
      ];
    }

    console.log("long");
>>>>>>> b22ac87eb88a9a17e2f3e79ed41ab415d1ef077b
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.uid}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        if (i === this.state.index + 1) {
          // Return Animated.View for rendering purposed
          return (
            <Animated.View
              key={item.uid}
              style={[styles.cardStyle, styles.nextCardStyle]}
            >
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
      })
      .reverse();
  }
  render() {
    if (this.props.forceSwipe) {
      this.forceSwipe(this.props.forceSwipe);
    }
    return (
      <View>
        <View style={styles.deckContainer}>{this.renderCards()}</View>
      </View>
    );
  }
}

Deck.defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  renderNoMoreCards: () => {}
};

const styles = {
  deckContainer: {
    display: "flex",
    alignItems: "center"
  },
  cardStyle: {
    position: "absolute",
    width: screeWidth
  },
  nextCardStyle: {
    selfAlign: "center",
    width: screeWidth - 10,
    top: screenHeight / 90,
    opacity: 0.95
  },
  likeButton: {
    display: "flex",
    alignItems: "center",
    height: screenHeight * 0.9,
    width: screeWidth
  },
  dislikeButton: {
    position: "absolute",
    width: screeWidth * 0.25,
    height: screenHeight * 0.9
  }
};

export default Deck;
