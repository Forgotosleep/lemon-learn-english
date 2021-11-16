import { SET_SCORE, SET_SCORES, SET_SCORES_ISLOADING, SET_SCORES_ISERROR, SET_SCORES_SUCCESS_MESSAGE, SET_SCORES_ERROR_MESSAGE } from "../actionTypes";

const initialState = {
  score: {},
  scores: {},
  isLoading: false,
  isError: null,
  messageSuccess: "",
  messageError: "",
};

function scoresReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SCORE:
      return { ...state, score: action.payload };
    case SET_SCORES:
      return { ...state, scores: action.payload };
    case SET_SCORES_ISLOADING:
      return { ...state, isLoading: action.payload };
    case SET_SCORES_ISERROR:
      return { ...state, isError: action.payload };
    case SET_SCORES_SUCCESS_MESSAGE:
      return { ...state, messageSuccess: action.payload };
    case SET_SCORES_ERROR_MESSAGE:
      return { ...state, messageError: action.payload };
    default:
      return state;
  }
}

export default scoresReducer;
