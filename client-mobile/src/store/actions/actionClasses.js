import { alertError, alertSuccess } from "../../assets/js/sweetalert2";
import { SET_CLASSES, SET_ISLOADING, SET_ISERROR, SET_MESSAGE_CLASSES, SET_ERROR_CLASSES, SET_CLASSES_TEACHER, SET_TEACHER_STUDENTS } from "../actionTypes";

import ApiServer from "../api/axios";

export function setErrorClasses(payload) {
  return {
    type: SET_ERROR_CLASSES,
    payload,
  };
}

export function setMyStudents(payload) {
  return {
    type: SET_TEACHER_STUDENTS,
    payload,
  };
}

export function setClassesTeacher(payload) {
  return {
    type: SET_CLASSES_TEACHER,
    payload,
  };
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload,
  };
}

export function setMessageClasses(payload) {
  return {
    type: SET_MESSAGE_CLASSES,
    payload,
  };
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload,
  };
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
      dispatch(setIsLoading(true));
      let params = {};
      if (payload) {
        params = payload;
      }
      ApiServer({
        url: "/classes/active",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params,
      })
        .then(({ data }) => {
          dispatch(setClasses(data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          dispatch(setIsLoading(false));
        });
    });
  };
}

export function joinClass(payload) {
  return async (dispatch, getState) => {
    try {
      const id = Number(payload);
      const { data } = await ApiServer({
        method: "POST",
        url: "/student-class/" + id,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setMessageClasses(data["message"]));
    } catch (err) {
      dispatch(setErrorClasses(err.response.data.message));
    }
  };
}

export function getTeacherClases() {
  return async (dispatch, getState) => {
    try {
      dispatch(setIsLoading(true));
      const { data } = await ApiServer({
        url: "/classes/teacherClasses",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      dispatch(setClassesTeacher(data));
      dispatch(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}

export function addClass(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: "/classes",
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
      dispatch(getTeacherClases());
      dispatch(setMessageClasses("Success add class"));
    } catch (err) {
      dispatch(setErrorClasses(err.response.data.message));
    }
  };
}

export function updateStatusClass(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: "/classes/status/" + payload["id"],
        method: "patch",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
      dispatch(getTeacherClases());
      dispatch(setMessageClasses(data["message"]));
    } catch (err) {
      dispatch(setErrorClasses(err.response.data.message));
    }
  };
}

export function getMyStudents(payload) {
  return async (dis, state) => {
    try {
      const { id } = payload;
      let params = {};
      if (payload.status) {
        params["status"] = payload.status;
      }
      if (payload.page) {
        params["page"] = payload.page;
      }
      dis(setIsLoading(true));
      const { data } = await ApiServer({
        method: "get",
        url: "/student-class/" + id,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params,
      });
      dis(setMyStudents(data));
      dis(setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
}
export function addTask(payload) {
  return async (dist, state) => {
    try {
      const { data } = await ApiServer({
        url: "/tasks",
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: payload,
      });
      dist(getTeacherClases());
      dist(setMessageClasses("success add new task"));
    } catch (err) {
      dist(setErrorClasses(err.response.data.message));
    }
  };
}

export function updateRating(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      ApiServer({
        url: `/classes/${payload.id}`,
        method: "PATCH",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: { ratings: payload.rating },
      })
        .then(({ data }) => {
          resolve();
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };
}

export function updateScore(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: "/scores/" + payload.id,
        method: "put",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: { score: payload.score },
      });
      dispatch(getMyStudents({ id: payload.classId }));
      alertSuccess("success update score");
    } catch (error) {
      alertError("failed to update score");
    }
  };
}
