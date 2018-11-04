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
        user.liked = liked;
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
        user.disliked = dislked;
        firestore
          .collection(user.userType)
          .doc(user.uid)
          .update({ disliked: disliked });
      });
  };
};

shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const updateList = (user, snapshot, dispatch) => {
  let list = [];
  snapshot.forEach(doc => {
    let candidate = doc.data();
    if (
      !user.liked.includes(candidate.uid) &&
      !user.disliked.includes(candidate.uid)
    ) {
      console.log("UPDATE");
      console.log(candidate);
      console.log(user);
      list.push(candidate);
    }
  });
  dispatch({ type: T.FETCH_USERS_SUCCESS, payload: shuffle(list) });
}

export const queryUsers = user => {
  console.log("Running the query");
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  return dispatch => {
    if (user.userType == "Students") {
      firestore.collection("Recruiters").onSnapshot(snapshot => {
        updateList(user, snapshot, dispatch);
      });
    } else {
      firestore.collection("Students").onSnapshot(snapshot => {
        updateList(user, snapshot, dispatch);
      });
      // =======
      //   let list = [];
      //   let candidate;
      //   let updatedUser;
      // 
      //   return async dispatch => {
      //     await firestore
      //       .collection(user.userType)
      //       .doc(user.uid)
      //       .get()
      //       .then(object => {
      //         updatedUser = object.data();
      //         console.log("New me:", updatedUser);
      //       });
      // 
      //     console.log("new Me", updatedUser);
      // 
      //     if (user.userType == "Students") {
      //       firestore
      //         .collection("Recruiters")
      //         .get()
      //         .then(snapshot => {
      //           snapshot.forEach(doc => {
      //             candidate = doc.data();
      //             if (
      //               !updatedUser.liked.includes(candidate.uid) &&
      //               !updatedUser.disliked.includes(candidate.uid)
      //             ) {
      //               console.log("You should be here", candidate.name);
      //               list.push(candidate);
      //             }
      //           });
      //           dispatch({ type: T.FETCH_USERS_SUCCESS, payload: list });
      //         });
      //     } else {
      //       firestore
      //         .collection("Students")
      //         .get()
      //         .then(snapshot => {
      //           snapshot.forEach(doc => {
      //             candidate = doc.data();
      //             if (
      //               !updatedUser.liked.includes(candidate.uid) &&
      //               !updatedUser.disliked.includes(candidate.uid)
      //             ) {
      //               console.log("You don't belong here", candidate.name);
      //             } else {
      //               list.push(candidate.uid);
      //             }
      //           });
      //           dispatch({ type: T.FETCH_USERS_SUCCESS, payload: list });
      //         });
      // >>>>>>> 0cd5706727aceb5d7594ed7a3de308c3d836de71
    }
  };
};
