import { combineReducers } from "redux";
import classesReducer from "./classesReducers";

import userReducer from "./userReducer";
const reducers = combineReducers({
  classes: classesReducer,
  user: userReducer,
});
export default reducers;
