import { SET_SCORE, SET_SCORES, SET_SCORES_ISLOADING, SET_SCORES_ISERROR, SET_SCORES_SUCCESS_MESSAGE, SET_SCORES_ERROR_MESSAGE } from "../actionTypes";
import ApiServer from "../api/axios";
const FormData = require("form-data");

export function setScore(payload) {
  return {
    type: SET_SCORE,
    payload: payload,
  };
}

export function setScores(payload) {
  return {
    type: SET_SCORES,
    payload: payload,
  };
}

export function setScoresIsLoading(payload) {
  return {
    type: SET_SCORES_ISLOADING,
    payload,
  };
}

export function setScoresIsError(payload) {
  return {
    type: SET_SCORES_ISERROR,
    payload,
  };
}

export function setScoresMessageSuccess(payload) {
  return {
    type: SET_SCORES_SUCCESS_MESSAGE,
    payload,
  };
}

export function setScoresMessageError(payload) {
  return {
    type: SET_SCORES_ERROR_MESSAGE,
    payload,
  };
}

export function getScore(payload, question) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setScoresIsLoading(true));
      const file = new File([payload.blob], `newData.wav`, { type: "audio/wav", lastModified: Date.now() });
      let form = new FormData();
      form.append("file", file);
      form.append("question", question);
      ApiServer({
        url: "http://localhost:4001/scores/get-score",
        method: "POST",
        data: form,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          dispatch(setScoresIsLoading(false));
        });
    });
  };
}

export function addScore(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setScoresIsLoading(true));
      const file = new File([payload.audioData.blob], "newData.wav", { type: "audio/wav", lastModified: Date.now() });
      let form = new FormData();
      form.append("soundUrl", file);
      form.append("score", payload.scoreData);
      form.append("taskId", payload.taskId);
      ApiServer({
        url: "http://localhost:4001/scores",
        method: "POST",
        data: form,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          dispatch(setScoresMessageError(err.ressponse.data));
        })
        .finally(() => {
          dispatch(setScoresIsLoading(false));
        });
    });
  };
}

export function addScoreListening(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setScoresIsLoading(true));

      console.log(payload, "<< PAYLOAD FROM ADDSCORE LISTEN ACTION");

      ApiServer({
        url: "/scores",
        method: "POST",
        data: payload,
        headers: { access_token: localStorage.getItem("access_token") },
      })
        .then(({ data }) => {
          console.log(data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err.response);
          // dispatch(setScoresMessageError(err.ressponse.data))
        })
        .finally(() => {
          dispatch(setScoresIsLoading(false));
        });
    });
  };
}
