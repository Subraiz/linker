import * as T from "../actions/types";

const INITIAL_STATE = { name: "", email: "" };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.USER_INFORMATION_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case T.SAVE_USER_INFORMATION:
      return [action.payload];
    default:
      return INITIAL_STATE;
  }
};
