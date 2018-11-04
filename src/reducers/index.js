import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
import AuthReducer from "./auth_reducer";
import DeckReducer from "./deck_reducer";
import MatchReducer from "./match_reducer";

export default combineReducers({
  user: UserReducer,
  auth: AuthReducer,
  deck: DeckReducer,
  match: MatchReducer
});
