import axios from 'axios';
import moment from 'moment-timezone';
import { message } from 'antd';
// action
const LOAD_LODGE = 'LOAD_LODGE';
const LOAD_LODGE_ALL = 'LOAD_LODGE_ALL';
const UPDATE_LODGE_SUC = 'UPDATE_LODGE_SUC';
const ERROR_LODGE_SUBMIT = 'ERROR_LODGE_SUBMIT';
const DELETE_LODGE_SUC = 'DELETE_LODGE_SUC';
const ACCEPT_LODGE_REQ_SUC = 'ACCEPT_LODGE_REQ_SUC';
const LOAD_ACCEPTED_LODGE_SUC = 'LOAD_ACCEPTED_LODGE_SUC';
const ADD_LODGE_SUC = 'ADD_LODGE_SUC';

const initLodgeState = {
	msg: '',
	redirectTo: '',
	username: '',
	lodgeRequests: [], // current user's requust
	list: [] // all request [{key: int, request: reqObj, user: userObj}]
};
// store

//reducer
export function lodgeRedux (state = initLodgeState, action) {
	switch (action.type) {
	case LOAD_LODGE_ALL:
		return { ...state, list: action.payload, msg: action.msg };
	case LOAD_LODGE:
		return { ...state, lodgeRequests: action.payload };
	case ERROR_LODGE_SUBMIT:
		return { ...state, msg: action.msg };
	case ADD_LODGE_SUC:
		return { ...state, lodgeRequests: action.payload };
	case UPDATE_LODGE_SUC:
		return {
			...state,
			msg: action.msg,
			lodgeRequests: action.payload,
			redirectTo: '/myrequest'
		};
	case DELETE_LODGE_SUC:
		return { ...state, msg: action.msg };
	case ACCEPT_LODGE_REQ_SUC:
		return { ...state, msg: action.msg, list: action.payload };
	case LOAD_ACCEPTED_LODGE_SUC:
		return { ...state, msg: action.msg, acceptedLodge: action.acceptedList };
	default:
		return state;
	}
}

//helper
function errorMsg (msg) {
	message.error(msg);
	return { type: ERROR_LODGE_SUBMIT, msg: msg }; // =>action
}

function loadReq (request) {
	// console.log(request);
	return { type: LOAD_LODGE, payload: request };
}

function updateSuccess (request) {
	return { type: UPDATE_LODGE_SUC, msg: 'Update Successfully!', payload: request };
}

function addReqSuccess (reqList) {
	return { type: ADD_LODGE_SUC, payload: reqList };
}

function deleteSuccess () {
	return { type: DELETE_LODGE_SUC, msg: 'delete successfully' };
}

function getListSuc (list) {
	return { type: LOAD_LODGE_ALL, msg: 'Get list success', payload: list };
}

function acceptSuc (msg, newList) {
	return { type: ACCEPT_LODGE_REQ_SUC, msg: msg, payload: newList };
}

function loadAcceptReqSuc (msg, acceptedList) {
	// console.log(1);
	return { type: LOAD_ACCEPTED_LODGE_SUC, msg, acceptedList };
}

const parsePickreqInput = userInput => {
	// const timeStr = userInput.date + ' ' + userInput.time;
	// const nyTime = moment.tz(timeStr, 'America/New_York');
	const request = {
		published: userInput.publish,
		pickupLocation: userInput.pickupLocation,
		startDate: moment(userInput.startDate).tz('America/New_York'),
		leaveDate: moment(userInput.leaveDate).tz('America/New_York'),
		notes: userInput.notes
	};

	return request;
};
// action creator
export function loadLodgereq (username) {
	// load pickreq from db once and save it inside the redux store
	// console.log('loading existing lodge req in redux %s', username);
	return dispatch => {
		return axios
			.get(`/api/lodgeRequests/lodge/${username}`)
			.then(res => dispatch(loadReq(res.data.data)));
	};
}

// add a new lodgereq
export const addLodgereq = userInput => {
	const username = userInput.username;
	const request = parsePickreqInput(userInput);
	
	return dispatch => {
		return axios.post(`/api/lodgeRequests/lodge/${username}`, request)
			.then(res => {
				if (res.data.code === 0) {
					message.success(res.data.msg);
					dispatch(addReqSuccess(res.data.data));
				} else {
					message.error(res.data.msg);
				}
			});
	};
};

// update a published lodgereq
export function updateLodgereq (userInput, reqId) {
	if (
		!userInput.pickupLocation ||
		!userInput.startDate ||
		!userInput.leaveDate
	) {
		// console.log(userInput);
		return errorMsg('Missing key fields!');
	}
	const username = userInput.username;
	const request = parsePickreqInput(userInput);

	return dispatch => {
		return axios
			.put(`/api/requests/lodge/${username}`, { request, reqId }) //promise   //RESTful api
			.then(
				res => {
					if (res.status === 200 && res.data.code === 0) {
						dispatch(updateSuccess(res.data.data));
					} else {
						dispatch(errorMsg('Error happened when update!'));
					}
				},
				err => {
					// console.log(err.stack);
					dispatch(errorMsg('Error happened when update!'));
				}
			);
	};
}

// delete an published pickreq
export function deleteLodgereq (id, username) {
	return dispatch => {
		// // console.log('deleting request', id);
		return axios.delete(`/api/lodgeRequests/request/lodge/${id}`).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				dispatch(deleteSuccess());
				dispatch(loadLodgereq(username));
			} else {
				dispatch(errorMsg('Error happened when deleting this record!'));
			}
		});
	};
}

// for volunteer center page. List all the current available lodge requests
export function loadAllReq () {
	return dispatch => {
		// console.log('loading all the request');
		return axios.get('/api/lodgeRequests/lodge/list').then(res => {
			if (res.status === 200 && res.data.code === 0) {
				res.data.reqList.sort(
					(a, b) =>
						new Date(a.request.createdAt).getTime() -
						new Date(b.request.createdAt).getTime()
				);
				dispatch(getListSuc(res.data.reqList));
			} else {
				dispatch(errorMsg('Error happened when getting the request list'));
			}
		});
	};
}

// for volunteer to accept one request
export function acceptReq (reqId, username, reqList) {
	const newList = reqList.filter(item => item.request._id !== reqId);
	return dispatch => {
		// console.log(`${username} requesting the request ${reqId}`);
		return axios
			.post(`/api/lodgeRequests/request/lodge/${reqId}`, { volunteer: username })
			.then(res => {
				// console.log('res data:',res.data);
				if (res.status === 200) {
					// console.log(res.data);
					dispatch(acceptSuc(res.data.msg, newList));
				} else {
					// console.error(res.data.err);
					dispatch(errorMsg(res.data.msg));
				}
			});
	};
}

// load all accepted request as a volunteer
export const loadAcceptedLodge = volunteer => {
	// console.log('volunteer',volunteer);
	return dispatch => {
		return axios.get(`/api/lodgeRequests/volunteer2/${volunteer}`).then(res => {
			if (res.status === 200) {
				// console.log('load lodge accept',res.data.acceptedList);
				dispatch(loadAcceptReqSuc(res.data.msg, res.data.acceptedList));
			}
		});
	};
};

// volunteer cancel request
export const cancelLodgeRequest = (reqId, volunteerId) => {
	return dispatch => {
		return axios
			.put(`/api/lodgeRequests/cancel2/${reqId}`)
			.then(res => {
				if (res.data.code === 1) {
					dispatch(errorMsg(res.data.msg));
					return;
				}
				// console.log(res.data.msg);
				// console.log(volunteerId);
				return res;
			})
			.then(() => {
				return dispatch(loadAcceptedLodge(volunteerId));
			});
	};
};


