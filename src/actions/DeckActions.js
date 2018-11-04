import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";

export const updateMatches = (user, matches) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  return dispatch => {
    firestore
      .collection(user.userType)
      .doc(user.uid)
      .update({ matches: matches });
  };
};

export const onSwipeRight = (user, candidate) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  let liked = [];

  return async dispatch => {
    firestore
      .collection(user.userType)
      .doc(user.uid)
      .get()
      .then(doc => {
        liked = doc.data().liked;
        liked.push(candidate.uid);
        firestore
          .collection(user.userType)
          .doc(user.uid)
          .update({ liked: liked });
      });
  };
};

export const onSwipeLeft = (user, candidate) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  let disliked = [];

  return async dispatch => {
    firestore
      .collection(user.userType)
      .doc(user.uid)
      .get()
      .then(doc => {
        disliked = doc.data().disliked;
        disliked.push(candidate.uid);
        firestore
          .collection(user.userType)
          .doc(user.uid)
          .update({ disliked: disliked });
      });
  };
};

export const queryUsers = user => {
  console.log("Getting list ready");
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  let list = [];
  let candidate;

  return dispatch => {
    if (user.userType == "Students") {
      firestore.collection("Recruiters").onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          candidate = doc.data();
          if (
            !user.liked.includes(candidate.uid) &&
            !user.disliked.includes(candidate.uid)
          ) {
            console.log(candidate);
            console.log(user);
            list.push(candidate);
          }
        });
        dispatch({ type: T.FETCH_USERS_SUCCESS, payload: list });
      });
    } else {
      firestore.collection("Students").onSnapshot(snapshot => {
        snapshot.forEach(doc => {
          candidate = doc.data();
          if (
            !user.liked.includes(candidate.uid) &&
            !user.disliked.includes(candidate.uid)
          ) {
            console.log(candidate);
            console.log(user);
            list.push(candidate);
          }
        });
        dispatch({ type: T.FETCH_USERS_SUCCESS, payload: list });
      });
    }
  };
};
