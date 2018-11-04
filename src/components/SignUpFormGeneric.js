import React, { Component } from "react";
import { Text, View, LayoutAnimation, UIManager } from "react-native";
import { Actions } from "react-native-router-flux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { TouchableOpacity } from "../common/shared-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUser } from "../actions/LoginActions";
import * as USER from "../models/UserTypes";

class SignUpFormGeneric extends Component {
  componentDidUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  selectButton = index => {
    if (index == 0) {
      this.props.updateUser({ prop: "userType", value: USER.STUDENT });
      Actions.SignUpFormStudent();
    } else {
      this.props.updateUser({ prop: "userType", value: USER.RECRUITER });
      Actions.SignUpFormRecruiter();
    }
  };

  render() {
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={text => {
            this.props.updateUser({ prop: "name", value: text });
          }}
        />
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text => {
            this.props.updateUser({ prop: "email", value: text });
          }}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          onChangeText={text => {
            this.props.updateUser({ prop: "password", value: text });
          }}
        />
        <View style={styles.selectMessageContainer}>
          <Text style={styles.selectMessage}>I am a...</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(0);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.selectButton(1);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Recruiter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.user.name,
    email: state.user.email,
    password: state.user.password,
    userType: state.user.userType
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateUser: updateUser
    },
    dispatch
  );
};

const styles = {
  buttonsContainer: {
    flexDirection: "row",
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 30,
    backgroundColor: "#fff"
  },
  buttonText: {
    color: "#000"
  },
  selectMessageContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 56,
    marginBottom: 10
  },
  selectMessage: {
    fontSize: 20
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormGeneric);
