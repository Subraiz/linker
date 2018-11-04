import * as T from "../actions/types";

const INITIAL_STATE = { Students, Recruiters };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.FETCH_USERS_SUCCESS:
      [...state, action.payload];
    default:
      return state;
  }
};
