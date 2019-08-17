import axios from 'axios';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCC = 'AUTH_SUCC';
const LOGOUT = 'LOGOUT';
const ERROR_MSG = 'ERROR_MSG';
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
      return {...state, isAuth:false, msg:action.msg};
    default:
      return state;
  }
}

//helper
const authSuccess = (obj) => {
  const {pwd, ...data} = obj;
  return { type: AUTH_SUCC, payload: data };
};

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

//对外暴露的action creator
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
};

export function login({input, pwd}) {
  console.log(input, pwd);
  if(!input || !pwd) {
    return errorMsg('missing fields!');
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

export function register(userInput) {
// confirm: "test"
// email: "test@test.test"
// firstName: "test"
// gender: "male"
// lastName: "test"
// pwd: "test"
// phone: "3523280696"
// username: "test"
// wechat: "test"
console.log(userInput);
  const { email, firstName, lastName, pwd, confirm, gender, phone, wechatId, username } = userInput;
  if(!email || !firstName || !lastName || !pwd || pwd !== confirm || !gender
    || !wechatId || !username) {
      return errorMsg('missing fields!');
  }
  const displayName = [firstName, lastName].join(' ');
  const registerInfo = {...userInput, displayName: displayName};

  return dispatch => {
    axios.post('/api/user/register', registerInfo)
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      })
  }
}