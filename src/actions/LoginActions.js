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
  let uid = "";
  let user;
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  return async dispatch => {
    await dispatch({ type: T.LOGIN_USER });
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userObject => {
        uid = userObject.user.uid;
        dispatch({ type: T.LOGIN_USER_SUCCESS });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: T.LOGIN_USER_FAILURE });
      });

    await firestore
      .collection("Recruiters")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          user = doc.data();
          if (uid == user.uid) {
            console.log("Profile Found for Recruiter");
            dispatch({ type: T.SAVE_USER_INFORMATION, payload: user });
            Actions.swipe({ user: user });
          }
        });
      });

    await firestore
      .collection("Students")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          user = doc.data();
          if (uid == user.uid) {
            console.log("Profile Found for Student");
            dispatch({ type: T.SAVE_USER_INFORMATION, payload: user });
            Actions.swipe({ user: user });
          }
        });
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
  let uid = "";
  let newUser;
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  return async dispatch => {
    await auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(userObject => {
        uid = userObject.user.uid;
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
            uid: uid,
            name,
            email,
            school,
            major,
            gpa,
            about,
            skills,
            userType: "Students",
            liked: [],
            disliked: [],
            matches: []
          };
        } else {
          let {
            name,
            email,
            companyName,
            companyAddress,
            companyDescription,
            industry,
            positions
          } = user;
          newUser = {
            uid: uid,
            name,
            email,
            companyName,
            companyAddress,
            companyDescription,
            industry,
            positions,
            userType: "Recruiters",
            liked: [],
            disliked: [],
            matches: []
          };
        }
      })
      .catch(error => console.log(error));

    await firestore
      .collection(user.userType)
      .doc(uid)
      .set(newUser)
      .then(object => {
        Actions.swipe({ user: newUser });
      })
      .catch(error => console.log(error));
  };
};
