import { SET_TASK, SET_TASKS, SET_SONG, SET_SONGS, SET_TASKS_ISLOADING, SET_TASKS_ISERROR, SET_TASKS_SUCCESS_MESSAGE, SET_TASKS_ERROR_MESSAGE } from "../actionTypes";

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
      setTasksIsLoading(true)
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
      setTasksIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
}

export function getSongDetail(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: `/tasks/search-songs/${payload.id}`,
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        }
      });
      dispatch(setSong(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getListeningQuestion(payload) {
  return async (dispatch, getState) => {
    try {
      const { data } = await ApiServer({
        url: "/tasks/question",
        method: "GET",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          song: payload.song,
          id: payload.id,
          index: payload.index,
        }
      });
      dispatch(setTask(data));
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getListeningScore(payload) {
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



export function fetchTasks(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setTasksIsLoading(true))
      ApiServer({
        url: `/tasks/class/${payload}`,
        method: 'GET',
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(({data})=>{
        dispatch(setTasks(data))
        resolve()
      })
      .catch((err)=>{
        dispatch(setTasksMessageError(err))
        reject(err)
      })
      .finally(()=>{
        dispatch(setTasksIsLoading(false))
      })
    })
  }
}

export function fetchTask(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setTasksIsLoading(true))
      ApiServer({
        url: `/tasks/${payload}`,
        method: 'GET',
        headers: {access_token: localStorage.getItem('access_token')}
      })
      .then(({data})=>{
        dispatch(setTask(data))
        resolve()
      })
      .catch((err)=>{
        dispatch(setTasksMessageError(err))
        reject(err)
      })
      .finally(()=>{
        dispatch(setTasksIsLoading(false))
      })
    })
  }
}