import { SET_TASK, SET_TASKS, SET_SONG, SET_SONGS, SET_MEDIA, SET_TASKS_ISLOADING, SET_TASKS_ISERROR, SET_TASKS_SUCCESS_MESSAGE, SET_TASKS_ERROR_MESSAGE } from "../actionTypes";

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

export function setSong(payload) {
  return {
    type: SET_SONG,
    payload: payload,
  };
}

export function setSongs(payload) {
  return {
    type: SET_SONGS,
    payload: payload,
  };
}

export function setMedia(payload) {
  return {
    type: SET_MEDIA,
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

export function searchSongs(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setTasksIsLoading(true))
      const { data } = await ApiServer({
        url: "/tasks/search-songs",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        params: {
          artist: payload.artist,
          title: payload.title
        }
      });
      console.log(data);
      dispatch(setSongs(data));
      dispatch(setTasksIsLoading(false))
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSongDetail(payload) {
  return async (dispatch, getState) => {
    dispatch(setTasksIsLoading(true))
    try {
      const { data } = await ApiServer({
        url: `/tasks/search-songs/${payload.id}`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      });
      dispatch(setSong(data));
      dispatch(setMedia(data.media))
      dispatch(setTasksIsLoading(false))
    } catch (error) {
      console.log(error);
    }
  };
}

export function getListeningQuestion(payload) {
  return async (dispatch, getState) => {
    try {
      // console.log(payload, "<<<< PAYLOAD GET LISTEN QUESTION");
      const { data } = await ApiServer({
        url: "/tasks/question",
        method: "POST",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        // data: payload
        data: payload
      });
      // console.log(data, "<<< FROM LISTENING QUESTION ACTION");
      dispatch(setTask(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getListeningScore(payload) {  // Also submits student's answer
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await ApiServer({
//         url: "/tasks/get-listening-score",
//         method: "GET",
//         headers: {
//           access_token: localStorage.getItem("access_token"),
//         },
//         data: {
//           answer: payload.answer,
//           song: payload.song,
//           id: payload.id,
//           index: payload.index,
//         }
//       });
//       dispatch(setScore(data));  // Gotta get to score stuff
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }