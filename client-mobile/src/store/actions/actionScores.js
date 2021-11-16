import { SET_SCORE, SET_SCORES, SET_SCORES_ISLOADING, SET_SCORES_ISERROR, SET_SCORES_SUCCESS_MESSAGE, SET_SCORES_ERROR_MESSAGE } from "../actionTypes";

import ApiServer from "../api/axios";

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
