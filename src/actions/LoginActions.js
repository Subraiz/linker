import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";
import Student from "../models/Student";
import Recruiter from "../models/Recruiter";
import * as USER from "../models/UserTypes";

export const updateUser = ({ prop, value }) => {
  return {
    type: T.USER_INFORMATION_UPDATE,
    payload: { prop, value }
  };
};

export const logInUser = (email, password) => {
  const auth = firebase.auth();
  return async dispatch => {
    dispatch({ type: T.LOGIN_USER });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: T.LOGIN_USER_SUCCESS });
        Actions.swipe();
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: T.LOGIN_USER_FAILURE });
      });
  };
};

export const updateLoginInfo = ({ prop, value }) => {
  return {
    type: T.UPDATE_LOGIN_INFO,
    payload: { prop, value }
  };
};

export const registerUser = user => {
  let newUser;
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  return async dispatch => {
    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userObject => {
        const uid = userObject.user.uid;

        if (user.userType == USER.STUDENT) {
          let {
            name,
            email,
            phone,
            image,
            school,
            major,
            gpa,
            about,
            skills
          } = user;
          if (!school) school = "Boston College";
          newUser = {
            uid,
            name,
            email,
            school,
            major,
            gpa,
            about,
            skills
          };
        } else {
          let {
            uid,
            name,
            email,
            phone,
            image,
            companyName,
            companyAddress,
            companyDescription,
            industry,
            positionsAvailable
          } = user;
          newUser = new Recruiter(
            uid,
            name,
            email,
            companyName,
            companyAddress,
            companyDescription,
            industry,
            positionsAvailable
          );
        }
      })
      .catch(error => console.log(error));

    console.log(newUser);

    await firestore
      .collection(user.userType)
      .add(newUser)
      .then(() => {
        dispatch({ type: T.SAVE_USER_INFORMATION, payload: newUser });
        Actions.swipe();
      })
      .catch(error => console.log(error));
  };
};
