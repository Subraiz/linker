import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";
import * as USER from "../models/UserTypes";

export const fetchMatches = user => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  let updatedMatches = [];
  let userType = "Recruiters";
  if (user.userType == "Recruiters") {
    console.log("A recruiter is accessing this");
    userType = "Students";
  }

  return async dispatch => {
    console.log("Fetch");
    console.log(user);
    await firestore.collection(userType).onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        let candidate = doc.data();
        if (
          candidate.liked.indexOf(user.uid) !== -1 &&
          user.liked.indexOf(candidate.uid) !== -1
        ) {
          console.log("Its a match!");
          console.log(user.name, "and", candidate.name);
          updatedMatches.push(candidate);
        }
      });
      dispatch({ type: T.FETCH_MATCHES, payload: updatedMatches });
    });
  };
};
