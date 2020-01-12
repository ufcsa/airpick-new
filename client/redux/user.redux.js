import axios from 'axios';
import { message } from 'antd';
// action
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCC = 'AUTH_SUCC';
const LOGOUT = 'LOGOUT';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  redirectTo: '',
  msg: '',
  username: '',
  isAuth: false
};

//reducer
export function userRedux(state = initState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return { ...state, ...action.payload, isAuth: true };
    case AUTH_SUCC:
      return { ...state, msg: '', ...action.payload, isAuth: true, redirectTo: '/home' };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    case LOGOUT:
      return { ...initState }
    default:
      return state;
  }
}

//helper
const authSuccess = (obj) => {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCC, payload: data };
};

function errorMsg(msg) {
  message.error(msg);
  return { msg, type: ERROR_MSG }
}

//对外暴露的action creator
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
};

export function logoutRedux() {
  return { type: LOGOUT };
};

export function login({ input, pwd }) {
  // console.log(input, pwd);
  if (!input || !pwd) {
    return errorMsg('missing fields!');
  }

  return dispatch => {
    return axios.post('/api/user/login', { input, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
          throw new Error('Failed to authenticate this user!');
        }
      })
  }
};

export function register(userInput) {
  console.log(userInput);
  const { email, firstName, lastName, pwd, confirm, gender, wechatId, username } = userInput;
  if (!email || !firstName || !lastName || !pwd || pwd !== confirm || !gender
    || !wechatId || !username) {
    return errorMsg('missing fields!');
  }
  const displayName = [firstName, lastName].join(' ');
  const registerInfo = { ...userInput, displayName: displayName };

  return dispatch => {
    axios.post('/api/user/register', registerInfo)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      })
  }
};