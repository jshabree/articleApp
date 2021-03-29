import {
  combineReducers
} from "redux";
import * as Types from "../actions/types";
import authReducer from "./authReducer";
import articleListReducer from "./articleListReducer";
import articlesReducer from "./articlesReducer";
import userReducer from "./userReducer";

// cont rootReducer = combineReducers({auth})
const appReducer = combineReducers({
  authReducer,
  articleListReducer,
  articlesReducer,
  userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;