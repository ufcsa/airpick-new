import axios from 'axios';
import moment from 'moment-timezone';
import { message } from 'antd'
// action
const LOAD_REQ = 'LOAD_REQ';
const UPDATE_SUC = 'UPDATE_SUC'
const ERROR_SUBMIT = 'ERROR_SUBMIT';

const initState = {
  msg: '',
  redirectTo: '',
  username: '',
  request: null,
};
// store

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
  return { type: ERROR_SUBMIT, msg: msg}  // =>action
}

function loadReq(request) {
  console.log(request)
  return { type: LOAD_REQ, payload: request }
}

function updateSuccess(request) {
  if(!request.data.request.published) {
    message.warning('Update Successfully, but your request is not published!')
  } else {
    message.success('Update Successfully! Your request has been published!');
  }
  
  return { type: UPDATE_SUC, msg: 'Update Successfully!', payload: request}
}
// action creator
export function loadPickreq(username) {
  // load pickreq from db once and save it inside the redux store
  console.log('loading existing req in redux')
  return dispatch => {
    axios.get(`/api/requests/${username}`)
      .then(res => dispatch(loadReq(res.data)))
  }
}

export function updatePickreq(userInput) {
  if(!userInput.airport || !userInput.date || !userInput.time || userInput.publish == null) {
    console.log(userInput)
    return errorMsg('Missing key fields!');
  }
  const username = userInput.username;
  const timeStr = userInput.date + ' ' + userInput.time;
  const nyTime = moment.tz(timeStr, 'America/New_York');
  const request = {
    published: userInput.publish,
    volunteer: userInput.volunteer,
    airport: userInput.airport,
    arrivalTime: nyTime,
    carryon: userInput.carryon,
    luggage: userInput.luggage,
    notes: userInput.notes
  }
 
  return dispatch => {
    console.log('dispatching')
    axios.put(`/api/requests/${username}`, request) //promise   //RESTful api
      .then(res => {
        if(res.status === 200 && res.data.code === 0) {
          dispatch(updateSuccess(res.data))
        }
      })
  }
}

