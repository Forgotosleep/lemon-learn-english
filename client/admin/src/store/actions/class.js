import server from "../../apis/server";
import {
  SET_CLASSES,
  SET_CLASSESDETAILS,
  SET_CLASSESERROR,
  SET_CLASSESLOADING,
} from "./type";

export function setClasses(payload) {
  return {
    type: SET_CLASSES,
    payload,
  };
}

export function setClassDetails(payload) {
  return {
    type: SET_CLASSESDETAILS,
    payload,
  };
}

export function setClassesLoading(payload) {
  return {
    type: SET_CLASSESLOADING,
    payload,
  };
}

export function setClassesError(payload) {
  return {
    type: SET_CLASSESERROR,
    payload,
  };
}

// Server Fetch
export function getClasses() {
  return async (dispatch, getState) => {
    dispatch(setClassesLoading(true));
    try {
      const resp = await server({
        url: "/classes",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setClasses(resp.data.result));
    } catch (err) {
      dispatch(setClassesError(true));
      console.log("errors", err);
    } finally {
      dispatch(setClassesLoading(false));
    }
  };
}

export function getClassDetails(id) {
  return async (dispatch, getState) => {
    dispatch(setClassesLoading(true));
    try {
      const resp = await server({
        url: `/classes/${id}`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setClassDetails(resp.data));
    } catch (err) {
      dispatch(setClassesError(true));
      console.log("errors", err);
    } finally {
      dispatch(setClassesLoading(false));
    }
  };
}

export function addClass(payload) {
  return async (dispatch, getState) => {
    dispatch(setClassesLoading(true));
    console.log("send class data:", payload);
    try {
      const resp = await server({
        url: `/classes`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });

      //   dispatch(setClasses(resp.data));
    } catch (err) {
      dispatch(setClassesError(true));
      console.log("errors", err);
    } finally {
      dispatch(setClassesLoading(false));
    }
  };
}

export function editClass(id, payload) {
  return async (dispatch, getState) => {
    dispatch(setClassesLoading(true));
    try {
      const resp = await server({
        url: `/classes/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        body: payload,
      });
    } catch (err) {
      dispatch(setClassesError(true));
      console.log("errors", err);
    } finally {
      dispatch(setClassesLoading(false));
    }
  };
}

export function deleteClass(id) {
  return async (dispatch, getState) => {
    dispatch(setClassesLoading(true));
    try {
      const resp = await server({
        url: `/classes/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(getClasses());
    } catch (err) {
      dispatch(setClassesError(true));
      console.log("errors", err);
    } finally {
      dispatch(setClassesLoading(false));
    }
  };
}
