import {REGISTRATION,LOGIN_SUCCESS,LOGIN_ERROR,GET_USER} from './type';

export const registration = () => ({
  type: REGISTRATION
})

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
})

export const loginError = (error) => ({
  type: LOGIN_ERROR,
  payload: error
})

export const getUser = (user) => ({
  type: GET_USER,
  payload: user
})