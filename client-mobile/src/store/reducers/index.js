import { combineReducers } from "redux";
import classesReducer from "./classesReducers";
import userReducer from "./userReducer";
import tasksReducer from "./tasksReducer"
import scoresReducer from "./scoresReducer"
const reducers = combineReducers({
  classes: classesReducer,
  user: userReducer,
  scores: scoresReducer,
  tasks: tasksReducer,
});
export default reducers;
