import {REGISTRATION,LOGIN_SUCCESS,LOGIN_ERROR,GET_USER} from './type';

const loginReducer = (state={},action) => {
  switch(action.type){
    case REGISTRATION: return{
      ...state
    }
    case LOGIN_SUCCESS: return{
      ...state,
      userId: action.payload.userId,
      token: action.payload.token
    }
    case LOGIN_ERROR: return{
      ...state,
      error: action.payload.error
    }
    case GET_USER: return{
      ...state,
      currentUser: action.payload
    }
    default: return state
  }
}

export default loginReducer