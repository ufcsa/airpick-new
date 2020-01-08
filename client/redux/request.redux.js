import axios from 'axios';
import moment from 'moment-timezone';
import { message } from 'antd';
// action
const LOAD_REQ = 'LOAD_REQ';
const LOAD_ALL = 'LOAD_ALL';
const UPDATE_SUC = 'UPDATE_SUC';
const ERROR_SUBMIT = 'ERROR_SUBMIT';
const DELETE_SUC = 'DELETE_SUC';

const initState = {
  msg: '',
  redirectTo: '',
  username: '',
  request: null,
  list: []
};
// store

//reducer
export function requestRedux(state = initState, action) {
  switch (action.type) {
    case LOAD_ALL:
      return { ...state, list: action.payload, msg: action.msg }
    case LOAD_REQ:
      return { ...state, request: action.payload.data };
    case ERROR_SUBMIT:
      return { ...state, msg: action.msg };
    case UPDATE_SUC:
      return { ...state, msg: action.msg, request: action.payload.data, redirectTo: '/myrequest' };
    case DELETE_SUC:
      return { ...state, msg: action.msg, request: null };
    default:
      return state;
  }
};

//helper
function errorMsg(msg) {
  message.error(msg)
  return { type: ERROR_SUBMIT, msg: msg }  // =>action
}

function loadReq(request) {
  console.log(request.data)
  return { type: LOAD_REQ, payload: request }
}

function updateSuccess(request) {
  if (!request.data.request.published) {
    message.warning('Update Successfully, but your request is not published!')
  } else {
    message.success('Update Successfully! Your request has been published!');
  }

  return { type: UPDATE_SUC, msg: 'Update Successfully!', payload: request };
}

function deleteSuccess() {
  return { type: DELETE_SUC, msg: 'delete successfully' };
}

function getListSuc(list) {
  return { type: LOAD_ALL, msg: 'Get list success', payload: list };
}
// action creator
export function loadPickreq(username) {
  // load pickreq from db once and save it inside the redux store
  console.log('loading existing req in redux %s', username);
  return dispatch => {
    axios.get(`/api/requests/user/${username}`)
      .then(res => dispatch(loadReq(res.data)))
  }
};

export function updatePickreq(userInput) {
  if (!userInput.airport || !userInput.date || !userInput.time || userInput.publish == null) {
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
    return axios.put(`/api/requests/user/${username}`, request) //promise   //RESTful api
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(updateSuccess(res.data));
        } else {
          dispatch(errorMsg('Error happened when update!'));
        }
      }, err => {
        console.log(err.stack)
        dispatch(errorMsg('Error happened when update!'));
      })
  }
};

export function deletePickreq(data) {
  const id = data.key;

  return dispatch => {
    console.log('deleting request', id);
    axios.delete(`/api/requests/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(deleteSuccess());
        } else {
          dispatch(errorMsg('Error happened when deleting this record!'));
        }
      });
  }
};

// for volunteer center page. List all the current available requests
export function loadAllReq() {
  return dispatch => {
    console.log('loading all the request');
    return axios.get('/api/requests/list')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log(res.data.reqList)
          res.data.reqList.sort((a, b) => new Date(a.request.arrivalTime).getTime() - new Date(b.request.arrivalTime).getTime());
          dispatch(getListSuc(res.data.reqList));
        } else {
          dispatch(errorMsg('Error happened when getting the request list'));
        }
      });
  }
}