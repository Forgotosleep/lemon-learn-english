import server from "../../apis/server";
import {
  SET_TASKS,
  SET_TASKSDETAILS,
  SET_TASKSLOADING,
  SET_TASKSERROR,
} from "./type";

export function setTasks(payload) {
  return {
    type: SET_TASKS,
    payload,
  };
}

export function setTasksLoading(payload) {
  return {
    type: SET_TASKSLOADING,
    payload,
  };
}

export function setTasksError(payload) {
  return {
    type: SET_TASKSERROR,
    payload,
  };
}

// Server Fetch
export function getTasks(query) {
  return async (dispatch, getState) => {
    dispatch(setTasksLoading(true));
    try {
      const resp = await server({
        url: `/tasks?${query}`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setTasks(resp.data));
    } catch (err) {
      dispatch(setTasksError(true));
      console.log("errors", err);
    } finally {
      dispatch(setTasksLoading(false));
    }
  };
}

export function addTask(payload) {
  return async (dispatch, getState) => {
    dispatch(setTasksLoading(true));
    try {
      const resp = await server({
        url: `/tasks`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });

      dispatch(setTasksLoading(false));
      return true;
    } catch (err) {
      dispatch(setTasksError(true));
      console.log("errors", err);
      return false;
    }
  };
}

export function editTask(id, payload) {
  return async (dispatch, getState) => {
    dispatch(setTasksLoading(true));
    try {
      const resp = await server({
        url: `/tasks/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setTasksError(true));
      console.log("errors", err);
    } finally {
      dispatch(setTasksLoading(false));
    }
  };
}

export function deleteTask(id) {
  return async (dispatch, getState) => {
    dispatch(setTasksLoading(true));
    try {
      const resp = await server({
        url: `/tasks/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      // dispatch(getTasks());

      return true;
    } catch (err) {
      dispatch(setTasksError(true));
      console.log("errors", err);
    } finally {
      dispatch(setTasksLoading(false));
    }
  };
}
