//combine all the reducers here

import { combineReducers } from 'redux';
import { user } from './redux/user.redux';
import { request } from './redux/request.redux';

export default combineReducers({user, request});
