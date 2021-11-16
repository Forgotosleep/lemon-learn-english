import { SET_CLASSES, SET_ISLOADING, SET_ISERROR, SET_ERROR_CLASSES, SET_MESSAGE_CLASSES, SET_CLASSES_TEACHER, SET_TEACHER_STUDENTS } from "../actionTypes";

const initialState = {
  classes: {},
  isLoading: false,
  isError: null,
  messageSuccess: "",
  messageError: "",
  myStudents: {},
};

function classesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CLASSES:
      return { ...state, classes: action.payload };
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_ISERROR:
      return { ...state, isError: action.payload };
    case SET_MESSAGE_CLASSES:
      return { ...state, messageSuccess: action.payload };
    case SET_ERROR_CLASSES:
      return { ...state, messageError: action.payload };
    case SET_CLASSES_TEACHER:
      return { ...state, teacherClasses: action.payload };
    case SET_TEACHER_STUDENTS:
      return { ...state, myStudents: action.payload };
    default:
      return state;
  }
}

export default classesReducer;
