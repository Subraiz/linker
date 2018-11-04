import * as T from "../actions/types";

const INITIAL_STATE = { list: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.FETCH_USERS_SUCCESS:
      console.log("Here are the people you should see: ", action.payload);
      return { ...state, list: action.payload };
    case T.GET_MATCHES:
      console.log("These are the matches", action.payload);
      return { ...state, matches: action.payload };
    default:
      return state;
  }
};
