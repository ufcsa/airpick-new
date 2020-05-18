//combine all the reducers here

import { combineReducers } from 'redux';
import { userRedux } from './redux/user.redux';
import { airpickRedux } from './redux/airpick.redux';
import { lodgeRedux } from './redux/lodge.redux';

export default combineReducers({
	user: userRedux,
	airpick: airpickRedux,
	lodge: lodgeRedux
});
