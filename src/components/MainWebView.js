import React, { Component } from "react";
import { WebView, View, Text, Linking, Button } from "react-native";
import { Constants, WebBrowser } from "expo";

class MainWebView extends Component {
  state = {
    uri: ""
  };
  componentWillMount() {
    this._handlePressButtonAsync("https://" + this.props.website);
  }

  state = {
    result: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={styles.paragraph}
          title="Open WebBrowser"
          onPress={this._handlePressButtonAsync}
        />
      </View>
    );
  }

  _handlePressButtonAsync = async uri => {
    let result = await WebBrowser.openBrowserAsync(uri);
    this.setState({ result });
  };
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
};

export default MainWebView;
