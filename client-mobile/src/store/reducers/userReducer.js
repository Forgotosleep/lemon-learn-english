import { SET_USER } from "../actionTypes";

const initialState = {
  user: {},
};

function userReducer(state = initialState, action) {
  if (action.type === SET_USER) {
    return { ...state, user: action.payload };
  }
  return state;
}

export default userReducer;
