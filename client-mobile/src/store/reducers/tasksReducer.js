import { SET_TASK, SET_TASKS, SET_TASKS_ISLOADING, SET_TASKS_ISERROR, SET_TASKS_SUCCESS_MESSAGE, SET_TASKS_ERROR_MESSAGE } from "../actionTypes";

const initialState = {
  task: {},
  tasks: {},
  isLoading: false,
  isError: null,
  messageSuccess: "",
  messageError: "",
};

function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASK:
      return { ...state, task: action.payload };
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case SET_TASKS_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_TASKS_ISERROR:
      return { ...state, isError: action.payload };
    case SET_TASKS_SUCCESS_MESSAGE:
      return { ...state, messageSuccess: action.payload };
    case SET_TASKS_ERROR_MESSAGE:
      return { ...state, messageError: action.payload };
    default:
      return state;
  }
}

export default tasksReducer;
