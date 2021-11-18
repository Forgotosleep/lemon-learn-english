import {
  SET_MY_CLASSES,
  SET_LOADING_MYCLASSES,
  SET_ERROR_CLASSES
} from "../actionTypes";

import ApiServer from "../api/axios";

export function setIsErrorMyClasses(payload) {
  return {
    type: SET_ERROR_CLASSES,
    payload,
  };
}


export function setIsLoadingMyClasses(payload) {
  return {
    type: SET_LOADING_MYCLASSES,
    payload,
  };
}

export function setMyClasses(payload) {
  return {
    type: SET_MY_CLASSES,
    payload: payload,
  };
}

export function fetchMyClasses(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoadingMyClasses(true));
      const resp = await ApiServer({
        url: "/student-class",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      })
      dispatch(setMyClasses(resp.data))
      dispatch(setIsLoadingMyClasses(false))
    } catch (err) {
      dispatch(setIsErrorMyClasses(err))
    }
  };
}

export function updateStudentStatus(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      ApiServer({
        url: `/student-class/status/${payload}`,
        method: "PATCH",
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      })
      .then(({data})=>{
        resolve()
      })
      .catch((err)=>{

      })
      .finally(()=>{
        
      })
    })
  }
}
