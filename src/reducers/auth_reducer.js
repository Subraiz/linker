import * as T from "../actions/types";
import { Actions } from "react-native-router-flux";

const INITIAL_STATE = {
  email: "",
  password: "",
  loading: false,
  error: false,
  uid: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case T.UPDATE_LOGIN_INFO:
      return { ...state, [action.payload.prop]: action.payload.value };
    case T.LOGIN_USER:
      return { ...state, loading: true, error: false };
    case T.LOGIN_USER_SUCCESS:
      return { ...state, uid: action.payload };
    case T.LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: true, password: "" };
    default:
      return INITIAL_STATE;
  }
};
