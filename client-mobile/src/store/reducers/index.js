import { combineReducers } from "redux";
import userReducer from "./userReducers";
const reducers = combineReducers({
  user: userReducer
});

export default reducers;
