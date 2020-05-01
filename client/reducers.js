//combine all the reducers here

import { combineReducers } from 'redux';
import { userRedux } from './redux/user.redux';
import { airpickRedux } from './redux/airpick.redux';

export default combineReducers({
	user: userRedux,
	airpick: airpickRedux
});
