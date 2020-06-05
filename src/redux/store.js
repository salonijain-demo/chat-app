import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import chatReducer from './chat/reducer';
import loginReducer from './login/reducer';

// const combineReducer = ({
//   chatReducer: chatReducer,
//   loginReducer: loginReducer
// })

const store = createStore(loginReducer,applyMiddleware(thunk))

export default store