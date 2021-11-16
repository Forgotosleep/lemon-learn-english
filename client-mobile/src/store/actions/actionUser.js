import { SET_USER, SET_ISLOGGEDIN, SET_ISLOADING, SET_ISERROR } from "../actionTypes";

import ApiServer from "../api/axios";

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
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function setIsLoggedIn(payload) {
  return {
    type: SET_ISLOGGEDIN,
    payload,
  };
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload,
  };
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload,
  };
}

export function fetchLogin(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true));
      ApiServer({
        url: "/login",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          dispatch(setIsLoggedIn(true));
          resolve();
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    });
  };
}

export function fetchRegister(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true));
      ApiServer({
        url: "/register",
        method: "POST",
        data: payload,
      })
        .then(({ data }) => {
          resolve();
        })
        .catch((err) => {
          reject(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  };
}
