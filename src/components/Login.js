import React, { Component } from "react";
import {
  View,
  ButtonGroup
} from "../common/shared-components";

class Login extends Component {
  selectButton = (index) => {
    if (index === 0) {
      // Go to login
    } else {
      // Go to sign up
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginButtons}>
          <ButtonGroup
            onPress={this.selectButton}
            buttons={['Login', 'Signup']}
            containerStyle={{ height: 60 }}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: ( Platform.OS == 'ios' ) ? 20 : 0,
  },
  loginButtons: {
    width: '100%', 
    height: 50, 
    backgroundColor: '#FF9800', 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
};
