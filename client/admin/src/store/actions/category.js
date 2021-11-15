import server from "../../apis/server";
import { SET_CATEGORY, SET_CATEGORYERROR, SET_CATEGORYLOADING } from "./type";

export function setCategories(payload) {
  return {
    type: SET_CATEGORY,
    payload,
  };
}

export function setCategoryLoading(payload) {
  return {
    type: SET_CATEGORYLOADING,
    payload,
  };
}

export function setCategoryError(payload) {
  return {
    type: SET_CATEGORYERROR,
    payload,
  };
}

// Server Fetch
export function getCategories() {
  return async (dispatch, getState) => {
    dispatch(setCategoryLoading(true));
    try {
      const resp = await server({
        url: "/categories",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setCategories(resp.data));
    } catch (err) {
      dispatch(setCategoryError(true));
      console.log("errors", err);
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
}

export function addCategory(payload) {
  return async (dispatch, getState) => {
    dispatch(setCategoryLoading(true));
    try {
      const resp = await server({
        url: `/categories`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setCategoryLoading(true));
      console.log("errors", err);
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
}

export function editCategory(id, payload) {
  return async (dispatch, getState) => {
    dispatch(setCategoryLoading(true));
    try {
      const resp = await server({
        url: `/categories/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setCategoryError(true));
      console.log("errors", err);
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch, getState) => {
    dispatch(setCategoryLoading(true));
    try {
      const resp = await server({
        url: `/categories/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(getCategories());
    } catch (err) {
      dispatch(setCategoryError(true));
      console.log("errors", err);
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
}
