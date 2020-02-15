import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
	const publicPath = ['/', '/login', '/register'];
	return (
		<Route
			{...rest}
			render={props => {
				if (isAuth === undefined) {
					return null;
				} else {
					return isAuth ? (
						<Component {...props} />
					) : publicPath.indexOf(props.location.pathname) === -1 ? (
						<Redirect to='/login' />
					) : null;
				}
			}}
		></Route>
	);
};

export default PrivateRoute;
