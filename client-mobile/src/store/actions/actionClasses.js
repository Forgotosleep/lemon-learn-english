import {
  SET_CLASSES,
  SET_ISLOADING,
  SET_ISERROR
} from "../actionTypes";

import ApiServer from "../api/axios";

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload
  }
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload
  }
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
      dispatch(setIsLoading(true))
      let params = {};
      if (payload) {
        params = payload;
      }
      ApiServer({
        url: "/classes/active",
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setClasses(data));
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch(setIsLoading(false))
        })

    })

    // try {
    //   dispatch(setIsLoading(true))
    //   let params = {};
    //   if (payload) {
    //     params = payload;
    //   }
    //   const { data } = await ApiServer({
    //     url: "/classes/active",
    //     method: "GET",
    //     headers: {
    //       access_token: token,
    //     },
    //     params,
    //   });
    //   dispatch(setClasses(data));
    //   if (data)dispatch(setIsLoading(false))
    // } catch (err) {
    //   console.log(err);
    // }
  };
}
