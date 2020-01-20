//combine all the reducers here

import { combineReducers } from 'redux';
import { userRedux } from './redux/user.redux';
import { requestRedux } from './redux/request.redux';

export default combineReducers({
	user: userRedux,
	request: requestRedux
});
