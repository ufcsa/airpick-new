import axios from 'axios';
const LOAD_REQ = 'LOAD_REQ';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  msg: '',
  redirectTo: '',
  username: '',
  request: null
};

//reducer
export function request(state=initState, action) {
  switch(action.type) {
    case LOAD_REQ:
      return { ...state, ...action.payload };
    case ERROR_MSG:
      return { ...state,  msg: action.msg };
    default:
      return state;
  }
};

