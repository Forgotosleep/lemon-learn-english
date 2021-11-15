import { SET_USER } from "../actionTypes";
import ApiServer from "../api/axios";

const token = localStorage.getItem("access_token");

export function setUser(payload) {
  return {
    type: SET_USER,
    payload: payload,
  };
}

export function getUser() {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: "/users/detail",
        method: "GET",
        headers: {
          access_token: token,
        },
      });
      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
