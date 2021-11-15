import { SET_CLASSES } from "../actionTypes";
import ApiServer from "../api/axios";

const token = localStorage.getItem("access_token");

export function setClasses(payload) {
  return {
    type: SET_CLASSES,
    payload: payload,
  };
}

export function getClassesActive(payload) {
  return async (dispatch, getState) => {
    try {
      let params = {};
      if (payload) {
        params = payload;
      }
      const { data } = await ApiServer({
        url: "/classes/active",
        method: "GET",
        headers: {
          access_token: token,
        },
        params,
      });
      dispatch(setClasses(data));
    } catch (err) {
      console.log(err);
    }
  };
}
