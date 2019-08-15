import axios from 'axios';
const LOAD_DATA = 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';
const AUTH_SUCC = 'AUTH_SUCC';
const LOGOUT = 'LOGOUT';

/*
  todo: finish logout
*/
const initState = {
  redirectTo: '',
  msg: '',
  username: '',
  type: '',
  isAuth: false
};

//reducer
export function user(state=initState, action) {
  switch(action.type) {
    case LOAD_DATA: 
      return {...state, ...action.payload};
    case AUTH_SUCC:
      return {...state, msg: '', ...action.payload};
    case ERROR_MSG: 
      return {...state, isAuth: false, msg: action.msg};
    default:
      return state;
  }
}

//helper
const authSuccess = (obj) => {
  const {pwd, ...data} = obj;
  return { type: AUTH_SUCC, payload: data };
};

const errorMsg = (msg) => {
  return { msg, type: ERROR_MSG };
};

//对外暴露的action creator
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
};

export function login({input, pwd}) {
  console.log(input, pwd);
  if(!input || !pwd) {
    return errorMsg('You are missing some fields!');
  }

  return dispatch => {
    axios.post('/api/user/login', {input, pwd})
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      })
  }
}