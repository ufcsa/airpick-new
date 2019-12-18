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

//helper
function errorMsg(msg) {
  return { type: ERROR_MSG, msg: msg} 
}

// action creator
export function loadPickreq(username) {
  // load pickreq from db once and save it inside the redux store
}

export function updatePickreq(userInput) {
  console.log('From request redux: ', userInput)
  if(!userInput.airport || !userInput.date || !userInput.time || !userInput.publish) {
    return errorMsg('Missing key fields!');
  }
  const username = userInput.username;
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
      .then(res => dispatch(errorMsg('Sent')))
  }
}

