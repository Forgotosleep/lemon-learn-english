import {
  SET_CLASSES,
  SET_CLASSESDETAILS,
  SET_CLASSESERROR,
  SET_CLASSESLOADING,
} from "../actions/type";

const initialState = {
  data: [],
  classDetails: {},
  loading: false,
  error: false,
};

function classReducer(state = initialState, action) {
  let newState = { ...state };

  switch (action.type) {
    case SET_CLASSES:
      newState.data = action.payload;
      break;

    case SET_CLASSESDETAILS:
      newState.classDetails = action.payload;
      break;

    case SET_CLASSESLOADING:
      newState.loading = action.payload;
      break;

    case SET_CLASSESERROR:
      newState.error = action.payload;
      break;
  }

  return newState;
}

export default classReducer;
