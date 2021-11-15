import server from "../../apis/server";
import { SET_LEVEL, SET_LEVELERROR, SET_LEVELLOADING } from "./type";

export function setLevel(payload) {
  return {
    type: SET_LEVEL,
    payload,
  };
}

export function setLevelLoading(payload) {
  return {
    type: SET_LEVELLOADING,
    payload,
  };
}

export function setLevelError(payload) {
  return {
    type: SET_LEVELERROR,
    payload,
  };
}

// Server Fetch
export function getLevels() {
  return async (dispatch, getState) => {
    dispatch(setLevelLoading(true));
    try {
      const resp = await server({
        url: "/levels",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setLevel(resp.data));
    } catch (err) {
      dispatch(setLevelError(true));
      console.log("errors", err);
    } finally {
      dispatch(setLevelLoading(false));
    }
  };
}

export function addLevel(payload) {
  return async (dispatch, getState) => {
    dispatch(setLevelLoading(true));
    try {
      const resp = await server({
        url: `/levels`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setLevelLoading(true));
      console.log("errors", err);
    } finally {
      dispatch(setLevelLoading(false));
    }
  };
}

export function editLevel(id, payload) {
  return async (dispatch, getState) => {
    dispatch(setLevelLoading(true));
    try {
      console.log("udpate level:", payload);
      const resp = await server({
        url: `/levels/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setLevelError(true));
      console.log("errors", err);
    } finally {
      dispatch(setLevelLoading(false));
    }
  };
}

export function deleteLevel(id) {
  return async (dispatch, getState) => {
    dispatch(setLevelLoading(true));
    try {
      const resp = await server({
        url: `/levels/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(getLevels());
    } catch (err) {
      dispatch(setLevelError(true));
      console.log("errors", err);
    } finally {
      dispatch(setLevelLoading(false));
    }
  };
}
