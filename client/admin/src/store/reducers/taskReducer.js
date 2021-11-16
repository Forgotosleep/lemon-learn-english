import {
  SET_TASKS,
  SET_TASKSDETAILS,
  SET_TASKSLOADING,
  SET_TASKSERROR,
} from "../actions/type";

const initialState = {
  data: [],
  loading: false,
  error: false,
};

function taskReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_TASKS:
      newState.data = action.payload;
      break;

    case SET_TASKSLOADING:
      newState.loading = action.payload;
      break;

    case SET_TASKSERROR:
      newState.error = action.payload;
      break;
  }

  return newState;
}

export default taskReducer;
