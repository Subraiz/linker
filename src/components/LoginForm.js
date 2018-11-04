import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Spinner } from "native-base";
import { Actions } from "react-native-router-flux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logInUser, updateLoginInfo } from "../actions/LoginActions";

class LoginForm extends Component {
  loginButton = () => {
    this.props.logInUser(this.props.email, this.props.password);
  };

  renderErrorMessage() {
    if (this.props.error) {
      return (
        <FormValidationMessage>
          Error Logging In - Please Try Again
        </FormValidationMessage>
      );
    }
  }

  renderLoadingOrButton() {
    if (this.props.loading) {
      return <Spinner color="black" />;
    } else {
      return (
        <TouchableOpacity onPress={this.loginButton} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <View>
        <FormLabel>Email</FormLabel>
        <FormInput
          value={this.props.email}
          onChangeText={text => {
            this.props.updateLoginInfo({
              prop: "email",
              value: "test@test.com"
            });
          }}
        />
        <FormLabel>Password</FormLabel>
        <FormInput
          value={this.props.password}
          secureTextEntry
          onChangeText={text => {
            this.props.updateLoginInfo({
              prop: "password",
              value: "123456"
            });
          }}
        />
        {this.renderErrorMessage()}
        <View style={styles.buttonsContainer}>
          {this.renderLoadingOrButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logInUser: logInUser,
      updateLoginInfo: updateLoginInfo
    },
    dispatch
  );
};

const styles = {
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0)",
    borderWidth: 1.5,
    borderColor: "babyblue",
    borderRadius: 6
  },
  buttonText: {
    color: "#000",
    fontSize: 20
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
)(LoginForm);
