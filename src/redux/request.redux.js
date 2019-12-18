import axios from 'axios';
import moment from 'moment-timezone';
import { message } from 'antd'

const LOAD_REQ = 'LOAD_REQ';
const UPDATE_SUC = 'UPDATE_SUC'
const ERROR_SUBMIT = 'ERROR_SUBMIT';

const initState = {
  msg: '',
  redirectTo: '',
  username: '',
  request: null,
};

//reducer
export function requestRedux(state=initState, action) {
  switch(action.type) {
    case LOAD_REQ:
      return { ...state, request: action.payload };
    case ERROR_SUBMIT:
      return { ...state,  msg: action.msg };
    case UPDATE_SUC:
      return { ...state, msg: action.msg, request: action.payload };
    default:
      return state;
  }
};

//helper
function errorMsg(msg) {
  message.error(msg)
  return { type: ERROR_SUBMIT, msg: msg} 
}

function loadReq(request) {
  console.log(request)
  return { type: LOAD_REQ, payload: request }
}

function updateSuccess(request) {
  message.success('Update Successfully!');
  return { type: UPDATE_SUC, msg: 'Update Successfully!', payload: request}
}
// action creator
export function loadPickreq(username) {
  // load pickreq from db once and save it inside the redux store
  return dispatch => {
    axios.get(`/api/requests/${username}`)
      .then(res => dispatch(loadReq(res.data)))
  }
}

export function updatePickreq(userInput) {
  if(!userInput.airport || !userInput.date || !userInput.time || !userInput.publish) {
    return errorMsg('Missing key fields!');
  }
  const username = userInput.username;
  const time = new Date(userInput.date + ' ' + userInput.time);
  const nyTime = moment(time);
  const request = {
    published: userInput.publish,
    volunteer: userInput.volunteer,
    airport: userInput.airport,
    arrivalTime: new Date(userInput.date + ' ' + userInput.time),
    carryon: userInput.carryon,
    luggage: userInput.luggage,
    notes: userInput.notes
  }
 
  return dispatch => {
    console.log('dispatching')
    axios.put(`/api/requests/${username}`, request)
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(updateSuccess(res.data))
        }
      })
  }
}

