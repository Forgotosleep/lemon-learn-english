import server from "../../apis/server";
import {
  SET_MATERIALS,
  SET_MATERIALSDETAILS,
  SET_MATERIALSLOADING,
  SET_MATERIALSERROR,
} from "./type";

export function setMaterials(payload) {
  return {
    type: SET_MATERIALS,
    payload,
  };
}

export function setMaterialsLoading(payload) {
  return {
    type: SET_MATERIALSLOADING,
    payload,
  };
}

export function setMaterialsError(payload) {
  return {
    type: SET_MATERIALSERROR,
    payload,
  };
}

// Server Fetch
export function getMaterials(query) {
  return async (dispatch, getState) => {
    dispatch(setMaterialsLoading(true));
    try {
      const resp = await server({
        url: `/materials?${query}`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(setMaterials(resp.data));
    } catch (err) {
      dispatch(setMaterialsError(true));
      console.log("errors", err);
    } finally {
      dispatch(setMaterialsLoading(false));
    }
  };
}

export function addMaterial(payload) {
  return async (dispatch, getState) => {
    dispatch(setMaterialsLoading(true));
    try {
      const resp = await server({
        url: `/materials`,
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });

      dispatch(setMaterialsLoading(false));
      return true;
    } catch (err) {
      dispatch(setMaterialsLoading(false));
      console.log("errors", err);
      return false;
    }
  };
}

export function editMaterial(id, payload) {
  return async (dispatch, getState) => {
    dispatch(setMaterialsLoading(true));
    try {
      const resp = await server({
        url: `/materials/${id}`,
        method: "PUT",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
    } catch (err) {
      dispatch(setMaterialsError(true));
      console.log("errors", err);
    } finally {
      dispatch(setMaterialsLoading(false));
    }
  };
}

export function deleteMaterial(id) {
  return async (dispatch, getState) => {
    dispatch(setMaterialsLoading(true));
    try {
      const resp = await server({
        url: `/materials/${id}`,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });

      dispatch(getMaterials());
    } catch (err) {
      dispatch(setMaterialsError(true));
      console.log("errors", err);
    } finally {
      dispatch(setMaterialsLoading(false));
    }
  };
}
