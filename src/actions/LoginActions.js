import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";
import Student from "../models/Student";
import Recruiter from "../models/Recruiter";
import * as USER from "../models/UserTypes";
import { updateList } from "./DeckActions";

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
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(userObject => {
        uid = userObject.user.uid;
        console.log("AAAAA");
        console.log(userObject);
        console.log(userObject.user.uid);
        console.log(uid);
        dispatch({ type: T.LOGIN_USER_SUCCESS });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: T.LOGIN_USER_FAILURE });
      });

    let userType = "";
    console.log("UUUUUU");
    console.log(uid);

    await firestore
      .collection("Recruiters")
      .doc(uid).get()
      .then(doc => {
        if (doc.exists) {
          user = doc.data();
          userType = "Recruiters";
          console.log("Profile Found for Recruiter");
          dispatch({ type: T.SAVE_USER_INFORMATION, payload: user });
          Actions.swipe({ user: user });
        }
      }).catch(() => {
      console.log("Not a recruiter");});

    await firestore
      .collection("Students")
      .doc(uid).get()
      .then(doc => {
        if (doc.exists) {
          user = doc.data();
          userType = "Students";
          console.log("Profile Found for Student");
          dispatch({ type: T.SAVE_USER_INFORMATION, payload: user });
          Actions.swipe({ user: user });
        }
      });

    firestore.collection(userType).doc(uid).onSnapshot(doc => {
      console.log("USER UPDATE");
      let user = doc.data();
      dispatch({ type: T.USER_INFORMATION_UPDATE, payload: user });

      firestore.collection((userType === "Recruiters") ? "Students" : "Recruiters").get().then(snapshot => {
        updateList(user, snapshot, dispatch);
      });
    });
  };
}

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
