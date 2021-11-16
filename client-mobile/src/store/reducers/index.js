import { combineReducers } from "redux";
import classesReducer from "./classesReducers";
import userReducer from "./userReducer";
<<<<<<< HEAD
import myClassesReducer from "./myClassesReducer";
import tasksReducer from "./tasksReducer";
import scoresReducer from "./scoreReducer";
const reducers = combineReducers({
  classes: classesReducer,
  user: userReducer,
  myClasses: myClassesReducer,
  tasks: tasksReducer,
  score: scoresReducer
=======
import tasksReducer from "./tasksReducer"
import scoresReducer from "./scoresReducer"
const reducers = combineReducers({
  classes: classesReducer,
  user: userReducer,
  scores: scoresReducer,
  tasks: tasksReducer,
>>>>>>> 1c10ce1aa42fc1240f8c44515fe4e5bae293c2ec
});
export default reducers;
