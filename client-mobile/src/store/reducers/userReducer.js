import {
  SET_ISLOGGEDIN,
  SET_ISLOADING,
  SET_ISERROR,
  SET_USER
} from '../actionTypes'

const initialState = {
  user: {},
  isLoggedIn: false,
  isLoading: false,
  isError: null
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISLOGGEDIN:
      return { ...state, isLoggedIn: action.payload }
    case SET_USER:
      return { ...state, user: action.payload }
    case SET_ISLOADING:
      return { ...state, isLoading: action.payload }
    case SET_ISERROR:
      return { ...state, isError: action.payload }
    default:
      return state
  }
}

export default userReducer