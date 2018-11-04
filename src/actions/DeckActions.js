import * as T from "./types.js";
import firebase from "@firebase/app";
require("firebase/auth");
import { Actions } from "react-native-router-flux";

export const queryUsers = (user) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  firestore.settings({ timestampsInSnapshots: true });

  if()

  firestore
    .collection(`Recruiters`)
    .orderBy("name", "asc")
    .onSnapshot(snapshot => {
      let employeesArray = [];
      snapshot.forEach(doc => {
        let employeeInfo = doc.data();
        let userID = doc.id;
        employeeInfo["id"] = userID;
        employeesArray.push(employeeInfo);
      });
      dispatch({ type: T.FETCH_USERS_SUCCESS, payload: employeesArray });
    });
};
