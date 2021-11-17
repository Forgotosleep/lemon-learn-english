import { combineReducers } from "redux";
import classesReducer from "./classesReducers";

import userReducer from "./userReducer";
import myClassesReducer from "./myClassesReducer";
import tasksReducer from "./tasksReducer";
import scoresReducer from "./scoreReducer";
const reducers = combineReducers({
  classes: classesReducer,
  user: userReducer,
  myClasses: myClassesReducer,
  tasks: tasksReducer,
  score: scoresReducer

});
export default reducers;
