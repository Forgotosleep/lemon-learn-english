import { SET_TASK, SET_TASKS, SET_TASKS_ISLOADING, SET_TASKS_ISERROR, SET_TASKS_SUCCESS_MESSAGE, SET_TASKS_ERROR_MESSAGE } from "../actionTypes";

import ApiServer from "../api/axios";
import { setIsErrorMyClasses, setIsLoadingMyClasses } from "./actionMyClasses";

export function setTask(payload) {
  return {
    type: SET_TASK,
    payload: payload,
  };
}

export function setTasks(payload) {
  return {
    type: SET_TASKS,
    payload: payload,
  };
}

export function fetchTasks(params) {
  return (dispatch, getstate) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoadingMyClasses(true))
      ApiServer({
        url: `/tasks/class/${params}`,
        method: 'GET',
        headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          dispatch(setTasks(data))
          resolve()
        })
        .catch((err) => {
          dispatch(setIsErrorMyClasses(err))
          reject()
        })
        .finally(() => {
          dispatch(setIsLoadingMyClasses(false))
        })
    })

  }
}



export function setTasksIsLoading(payload) {
  return {
    type: SET_TASKS_ISLOADING,
    payload,
  };
}

export function setTasksIsError(payload) {
  return {
    type: SET_TASKS_ISERROR,
    payload,
  };
}

export function setTasksMessageSuccess(payload) {
  return {
    type: SET_TASKS_SUCCESS_MESSAGE,
    payload,
  };
}

export function setTasksMessageError(payload) {
  return {
    type: SET_TASKS_ERROR_MESSAGE,
    payload,
  };
}