import React, { Component } from "react";
import {
  Text,
  View,
  LayoutAnimation,
  UIManager,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import {
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import Error from "../common/Error";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateUser } from "../actions/LoginActions";
import * as USER from "../models/UserTypes";

class SignUpFormGeneric extends Component {
  state = {
    errors: {}
  };

  renderButtons() {
    if (
      this.props.name == "" ||
      this.props.email == "" ||
      this.props.password == ""
    ) {
      return (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            disabled={true}
            onPress={() => {
              this.selectButton(0);
            }}
            style={styles.buttonDisabled}
          >
            <Text style={styles.buttonText}>Student</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            onPress={() => {
              this.selectButton(1);
            }}
            style={styles.buttonDisabled}
          >
            <Text style={styles.buttonText}>Recruiter</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
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
      );
    }
  }

  selectButton = index => {
    let errors = {};
    let errored = false;

    if (!this.props.name || this.props.name.length < 4) {
      errors.name = "Please provid ea valid name!";
      errored = true;
    }

    if (!this.props.email || this.props.email.length < 6) {
      errors.email = "Please provide a valid email!";
      errored = true;
    }

    if (!this.props.password) {
      errors.password = "Please provide a password!";
      errored = true;
    } else if (this.props.password.length < 6) {
      errors.password = "Password must be at least 6 characters long!";
      errored = true;
    }

    if (errored) {
      this.setState({ errors });
    } else {
      if (index == 0) {
        this.props.updateUser({ prop: "userType", value: USER.STUDENT });
        Actions.SignUpFormStudent();
      } else {
        this.props.updateUser({ prop: "userType", value: USER.RECRUITER });
        Actions.SignUpFormRecruiter();
      }
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <View>
        <FormLabel>Name</FormLabel>
        <FormInput
          onChangeText={text => {
            this.props.updateUser({ prop: "name", value: text });
          }}
        />
        <Error value={errors.name} />
        <FormLabel>Email</FormLabel>
        <FormInput
          onChangeText={text => {
            this.props.updateUser({ prop: "email", value: text });
          }}
        />
        <Error value={errors.email} />
        <FormLabel>Password</FormLabel>
        <FormInput
          secureTextEntry
          onChangeText={text => {
            this.props.updateUser({ prop: "password", value: text });
          }}
        />
        <Error value={errors.password} />
        <View style={styles.selectMessageContainer}>
          <Text style={styles.selectMessage}>I am a...</Text>
        </View>
        {this.renderButtons()}
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
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "navy",
    shadowOpacity: 0.3
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
  },
  buttonDisabled: {
    flex: 1,
    alignItems: "center",
    margin: 5,
    padding: 30,
    backgroundColor: "grey",
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "navy",
    shadowOpacity: 0.7
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormGeneric);
