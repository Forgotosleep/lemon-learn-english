import { combineReducers } from "redux";
import classReducer from "./classReducer";

const reducers = combineReducers({
  class: classReducer,
});

export default reducers;
