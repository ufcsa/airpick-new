import axios from 'axios';
import moment from 'moment-timezone';
import { message } from 'antd';
// action
const LOAD_REQ = 'LOAD_REQ';
const LOAD_ALL = 'LOAD_ALL';
const UPDATE_SUC = 'UPDATE_SUC';
const ERROR_SUBMIT = 'ERROR_SUBMIT';
const DELETE_SUC = 'DELETE_SUC';
const ACCEPT_REQ_SUC = 'ACCEPT_REQ_SUC';
const LOAD_ACCEPTED_SUC = 'LOAD_ACCEPTED_SUC';
const ADD_SUC = 'ADD_SUC';

const initState = {
	msg: '',
	redirectTo: '',
	username: '',
	myRequests: [], // current user's requust
	list: [] // all request [{key: int, request: reqObj, user: userObj}]
};
// store

//reducer
export function airpickRedux(state = initState, action) {
	switch (action.type) {
	case LOAD_ALL:
		return { ...state, list: action.payload, msg: action.msg };
	case LOAD_REQ:
		return { ...state, myRequests: action.payload };
	case ERROR_SUBMIT:
		return { ...state, msg: action.msg };
	case ADD_SUC:
		return { ...state, msg: action.paylaod };
	case UPDATE_SUC:
		return {
			...state,
			msg: action.msg,
			myRequests: action.payload,
			redirectTo: '/myrequest'
		};
	case DELETE_SUC:
		return { ...state, msg: action.msg };
	case ACCEPT_REQ_SUC:
		return { ...state, msg: action.msg, list: action.payload };
	case LOAD_ACCEPTED_SUC:
		return { ...state, msg: action.msg, acceptedList: action.acceptedList };
	default:
		return state;
	}
}

//helper
function errorMsg(msg) {
	message.error(msg);
	return { type: ERROR_SUBMIT, msg: msg }; // =>action
}

function loadReq(request) {
	console.log(request);
	return { type: LOAD_REQ, payload: request };
}

function updateSuccess(request) {
	return { type: UPDATE_SUC, msg: 'Update Successfully!', payload: request };
}

function addReqSuccess(reqList) {
	return { type: ADD_SUC, payload: reqList };
}

function deleteSuccess() {
	return { type: DELETE_SUC, msg: 'delete successfully' };
}

function getListSuc(list) {
	return { type: LOAD_ALL, msg: 'Get list success', payload: list };
}

function acceptSuc(msg, newList) {
	return { type: ACCEPT_REQ_SUC, msg: msg, payload: newList };
}

function loadAcceptReqSuc(msg, acceptedList) {
	return { type: LOAD_ACCEPTED_SUC, msg, acceptedList };
}

const parsePickreqInput = userInput => {
	const timeStr = userInput.date + ' ' + userInput.time;
	const nyTime = moment.tz(timeStr, 'America/New_York');
	const request = {
		published: userInput.publish,
		airport: userInput.airport,
		arrivalTime: nyTime,
		carryon: userInput.carryon,
		luggage: userInput.luggage,
		notes: userInput.notes
	};

	return request;
};
// action creator
export function loadPickreq(username) {
	// load pickreq from db once and save it inside the redux store
	console.log('loading existing req in redux %s', username);
	return dispatch => {
		return axios
			.get(`/api/requests/user/${username}`)
			.then(res => dispatch(loadReq(res.data.data)));
	};
}

// add a new pickreq
export const addPickreq = userInput => {
	const username = userInput.username;
	const request = parsePickreqInput(userInput);
	
	return dispatch => {
		return axios.post(`/api/requests/user/${username}`, request)
			.then(res => {
				if(res.data.code === 0) {
					message.success(res.data.msg);
					dispatch(addReqSuccess(res.data.data));
				} else {
					message.error(res.data.msg);
				}
			});
	};
};

// update a published pickreq
export function updatePickreq(userInput, reqId) {
	if (
		!userInput.airport ||
		!userInput.date ||
		!userInput.time ||
		userInput.publish == null
	) {
		console.log(userInput);
		return errorMsg('Missing key fields!');
	}
	const username = userInput.username;
	const request = parsePickreqInput(userInput);

	return dispatch => {
		return axios
			.put(`/api/requests/user/${username}`, {request, reqId}) //promise   //RESTful api
			.then(
				res => {
					if (res.status === 200 && res.data.code === 0) {
						dispatch(updateSuccess(res.data.data));
					} else {
						dispatch(errorMsg('Error happened when update!'));
					}
				},
				err => {
					console.log(err.stack);
					dispatch(errorMsg('Error happened when update!'));
				}
			);
	};
}

// delete an published pickreq
export function deletePickreq(data) {
	const id = data.key;
	return dispatch => {
		// console.log('deleting request', id);
		return axios.delete(`/api/requests/request/${id}`).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(deleteSuccess());
			} else {
				dispatch(errorMsg('Error happened when deleting this record!'));
			}
		});
	};
}

// for volunteer center page. List all the current available requests
export function loadAllReq() {
	return dispatch => {
		console.log('loading all the request');
		return axios.get('/api/requests/list').then(res => {
			if (res.status === 200 && res.data.code === 0) {
				// console.log(res.data.reqList)
				res.data.reqList.sort(
					(a, b) =>
						new Date(a.request.arrivalTime).getTime() -
						new Date(b.request.arrivalTime).getTime()
				);
				dispatch(getListSuc(res.data.reqList));
			} else {
				dispatch(errorMsg('Error happened when getting the request list'));
			}
		});
	};
}

// for volunteer to accept one request
export function acceptReq(reqId, username, reqList) {
	const newList = reqList.filter(item => item.request._id !== reqId);
	return dispatch => {
		console.log(`${username} requesting the request ${reqId}`);
		return axios
			.post(`/api/requests/request/${reqId}`, { volunteer: username })
			.then(res => {
				if (res.status === 200) {
					console.log(res.data);
					dispatch(acceptSuc(res.data.msg, newList));
				} else {
					console.error(res.data.err);
					dispatch(errorMsg(res.data.msg));
				}
			});
	};
}

// load all accepted request as a volunteer
export const loadAcceptedReq = volunteer => {
	console.log('loading accepted req');
	return dispatch => {
		return axios.get(`/api/requests/volunteer/${volunteer}`).then(res => {
			if (res.status === 200) {
				console.log('load accept');
				dispatch(loadAcceptReqSuc(res.data.msg, res.data.acceptedList));
			}
		});
	};
};

// volunteer cancel request
export const cancelRequest = (reqId, volunteerId) => {
	console.log('canceling request ', reqId);
	return dispatch => {
		return axios
			.put(`/api/requests/cancel/${reqId}`)
			.then(res => {
				if (res.data.code === 1) {
					dispatch(errorMsg(res.data.msg));
					return;
				}
				console.log(res.data.msg);
				console.log(volunteerId);
				return res;
			})
			.then(() => {
				return dispatch(loadAcceptedReq(volunteerId));
			});
	};
};


