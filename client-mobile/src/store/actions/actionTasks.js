import { SET_TASK, SET_TASKS, SET_TASKS_ISLOADING, SET_TASKS_ISERROR, SET_TASKS_SUCCESS_MESSAGE, SET_TASKS_ERROR_MESSAGE } from "../actionTypes";

import ApiServer from "../api/axios";

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

