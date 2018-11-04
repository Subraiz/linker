import * as T from "../actions/types";

const INITIAL_STATE = { name: "", email: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.USER_INFORMATION_UPDATE:
      if (state.uid) state = {};
      return { ...state, [action.payload.prop]: action.payload.value};
    case T.SAVE_USER_INFORMATION:
      return action.payload;
    default:
      console.log(state);
      return state;
  }
};
