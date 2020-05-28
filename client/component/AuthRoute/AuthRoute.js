import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from '../../container/auth/Login';
import Register from '../../container/auth/Register';
import MyRequest from '../../container/myRequest/MyRequest';
import AllPickReq from '../../container/Volunteer/AllPickReq';
import AllLodgeReq from '@/container/Volunteer/AllLodgeReq';
import MyAccept from '../../container/Volunteer/MyAccept';
import PrivateRoute from './PrivateRoute';
import { EditProfile } from '../../container/UserCenter/EditProfile';

function Home() {
	return <h2>Airpick homepage</h2>;
}

function NoMatch() {
	return <h2>404 Not Found</h2>;
}

function ChangePassword() {
	return <h2>Change password</h2>;
}

const navListRouting = (navList, isAuth) => {
	const routers = [];
	navList.forEach(op => {
		if (op.text === 'UF CSA Airpick') {
			routers.push(
				<Route
					exact
					key={op.text}
					path={op.path}
					component={op.component}
				></Route>
			);
		} else if (op.text === 'Volunteer') {
			const sublist = op.subItem;
			sublist.forEach(it => {
				routers.push(
					<PrivateRoute
						key={it.text}
						path={it.path}
						component={it.component}
						isAuth={isAuth}
					></PrivateRoute>
				);
			});
		} else if (op.text === 'usercenter') {
			op.subItem.forEach(it => {
				if (it.text !== 'Sign out') {
					routers.push(
						<PrivateRoute
							key={it.text}
							path={it.path}
							component={it.component}
							isAuth={isAuth}
						></PrivateRoute>
					);
				}
			});
		} else {
			if (op.auth) {
				routers.push(
					<PrivateRoute
						key={op.text}
						path={op.path}
						component={op.component}
						isAuth={isAuth}
					></PrivateRoute>
				);
			} else {
				routers.push(
					<Route key={op.text} path={op.path} component={op.component}></Route>
				);
			}
		}
	});

	routers.push(<Route key='nomatch' component={NoMatch}></Route>);
	return routers;
};

@withRouter
@connect(state => state, { loadData })
class AuthRoute extends React.Component {
	constructor(props) {
		super(props);
		console.log('checking if logged');

		const publicList = ['/login', '/register'];
		const pathname = this.props.location.pathname;
		if (publicList.indexOf(pathname) === -1) {
			axios.get('/api/user/info').then(res => {
				if (res.status === 200) {
					if (res.data.code === 0) {
						this.props.loadData(res.data.data);
					} else {
						console.log('going to login');
						this.props.history.push('/login');
					}
				}
			});
		}
	}

	render() {
		const isAuth = this.props.user.isAuth;
		const rightNavbarClass = 'navbar-right header-nav';
		const leftNavbarClass = 'navbar-left header-nav';
		
		const home = [
			{
				path: '/',
				text: 'UF CSA Airpick',
				component: Home,
				className: 'navbar-title',
				auth: false,
				hide: false
			}
		];
		const needAuth = [
			{
				path: '/myrequestcenter',
				text: 'My Requests',
				className: '',
				hide: !isAuth,
				component: MyRequest,
				auth: true
			},
			{
				text: 'Volunteer',
				hide: !isAuth,
				subItem: [
					{
						path: '/airpicklist',
						text: 'Airpick Requests',
						component: AllPickReq,
						auth: true
					},
					{
						path: '/lodgelist',
						text: 'Lodge Requests',
						component: AllLodgeReq,
						auth: true
					},
					{
						path: '/accepted',
						text: 'My Acception',
						component: MyAccept,
						auth: true
					}
				]
			}
		];
		const userAuth = [
			{
				path: '/register',
				text: 'Register',
				component: Register,
				className: rightNavbarClass,
				hide: isAuth,
				auth: false
			},
			{
				path: '/login',
				text: 'Login',
				component: Login,
				className: rightNavbarClass,
				hide: isAuth,
				auth: false
			},
			{
				text: 'usercenter',
				hide: !isAuth,
				className: rightNavbarClass,
				subItem: [
					{
						path: '/edit-profile',
						text: 'Edit Profile',
						component: EditProfile,
						auth: true
					},
					{
						path: '/change-password',
						text: 'Change Password',
						component: ChangePassword,
						auth: true
					},
					{
						text: 'Sign out',
						auth: true
					}
				]
			}
		];

		const allRouteList = [...home, ...needAuth, ...userAuth];

		return (
			<div>
				<div className='header'>
					<div className='logo'>
						<NavBar data={home}></NavBar>
					</div>
					<div className={rightNavbarClass}>
						<NavBar data={userAuth}></NavBar>
					</div>
					<div className={leftNavbarClass}>
						<NavBar data={needAuth}></NavBar>
					</div>
				</div>
				<div className='content'>
					<Switch>{navListRouting(allRouteList, isAuth)}</Switch>
				</div>
			</div>
		);
	}
}

export default AuthRoute;
