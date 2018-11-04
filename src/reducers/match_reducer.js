import * as T from "../actions/types";
import { Actions } from "react-native-router-flux";

const INITIAL_STATE = {
  user: {},
  matches: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.FETCH_LATEST_USER:
      return { ...state, user: action.payload };
    case T.FETCH_MATCHES:
      return { matches: action.payload };
    default:
      return INITIAL_STATE;
  }
};
