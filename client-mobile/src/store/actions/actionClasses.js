import { SET_CLASSES, SET_ISLOADING, SET_ISERROR, SET_MESSAGE_CLASSES, SET_ERROR_CLASSES } from "../actionTypes";

import ApiServer from "../api/axios";

export function setErrorClasses(payload) {
  return {
    type: SET_ERROR_CLASSES,
    payload,
  };
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload,
  };
}

export function setMessageClasses(payload) {
  return {
    type: SET_MESSAGE_CLASSES,
    payload,
  };
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload,
  };
}

export function setClasses(payload) {
  return {
    type: SET_CLASSES,
    payload: payload,
  };
}

export function getClassesActive(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, rejectF) => {
      dispatch(setIsLoading(true));
      let params = {};
      if (payload) {
        params = payload;
      }
      ApiServer({
        url: "/classes/active",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setClasses(data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    });
  };
}

export function joinClass(payload) {
  return async (dispatch, getState) => {
    try {
      const id = Number(payload);
      const { data } = await ApiServer({
        method: "POST",
        url: "/student-class/" + id,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setMessageClasses(data["message"]));
    } catch (err) {
      dispatch(setErrorClasses(err.response.data.message));
    }
  };
}
