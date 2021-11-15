import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import classReducer from "./classReducer";
import levelReducer from "./levelReducer";

const reducers = combineReducers({
  class: classReducer,
  level: levelReducer,
  category: categoryReducer,
});

export default reducers;
