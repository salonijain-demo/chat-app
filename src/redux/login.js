import Axios from 'axios';
import {registration,loginSuccess,loginError,getUser} from './login/action';
import {registration_api, login_api,get_user_api} from '../api'

export const signup = (user) => {
  return dispatch => {
    Axios.post(registration_api,user)
  }
}

export const signin = (user) => {
  return dispatch => {
    Axios.post(login_api,user)
    .then(res=>{
      console.log('res',res)
      dispatch(loginSuccess(res.data))
    })
    .catch(err=>{
      console.log('err',err)
      dispatch(loginError(err.message))
    })
  }
}

export const getCurrentUser = (id) => {
  return dispatch => {
    Axios.get(get_user_api+id)
    .then(res=>{
      dispatch(getUser(res.data))
    })
  }
}