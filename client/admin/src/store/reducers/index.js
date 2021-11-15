import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import classReducer from "./classReducer";
import levelReducer from "./levelReducer";
import materialReducer from "./materialReducer";
import taskReducer from "./taskReducer";

const reducers = combineReducers({
  class: classReducer,
  level: levelReducer,
  category: categoryReducer,
  task: taskReducer,
  material: materialReducer,
});

export default reducers;
