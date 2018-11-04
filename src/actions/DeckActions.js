import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";

export const queryUsers = user => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });
  if (user.userType == "Recruiters")
    firestore
      .collection(`Students`)
      .orderBy("name", "asc")
      .onSnapshot(snapshot => {
        let studentArray = [];
        snapshot.forEach(doc => {
          let user = doc.data();
          console.log(userInfo);
          studentArray.push(user);
        });
        dispatch({ type: T.FETCH_USERS_SUCCESS, payload: studentsArray });
      });
};
