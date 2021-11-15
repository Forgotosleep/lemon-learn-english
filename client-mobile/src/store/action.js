import axios from '../apis/axios'
import {
  SET_ISLOGGEDIN,
  SET_ISLOADING,
  SET_ISERROR
}
  from './actionTypes'

export function setIsLoggedIn(payload) {
  return {
    type: SET_ISLOGGEDIN,
    payload
  }
}

export function setIsError(payload) {
  return {
    type: SET_ISERROR,
    payload
  }
}

export function setIsLoading(payload) {
  return {
    type: SET_ISLOADING,
    payload
  }
}

export function fetchLogin(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: '/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          dispatch(setIsLoggedIn(true))
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
        .finally(()=>{
          setIsLoading(false)
        })
    })
  }
}

export function fetchRegister(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(setIsLoading(true))
      axios({
        url: '/register',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          resolve()
        })
        .catch((err) => {
          reject(err.response.data.message)
        })
        .finally(()=>{
          setIsLoading(false)
        })
    })
  }
}
