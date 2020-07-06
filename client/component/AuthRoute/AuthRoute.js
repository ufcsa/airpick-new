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
import { EditPassword } from '@/container/UserCenter/EditPassword';
import PrivateRoute from './PrivateRoute';
import { EditProfile } from '../../container/UserCenter/EditProfile';


function Home () {
	return (
		<section>
			<div className='background'>
				<br />
				<center>
					<img src={require('../../img/brand/CSA logo.png')} alt='CSA logo' className='center' />
					<pre className='highlight highlight-dark'>
						<p className='h1'>Welcome to the Gator Nation!</p>
					</pre>
					<br />
					<div className='highlight single-step'>
						<span className='text-danger'>
							<p className='typewriter english'>CSA would like to wish you all a pleasant trip. To ensure safe and efficient pick-ups for new students and our volunteers, we coordinate travel agendas here through the pick-up system. </p>
							<p className='typewriter english'>Please follow the registration and restrictions guidelines accordingly.</p>
						</span>
					</div>
					<br />
				</center>
				<p />
				<div className='single-step'>
					<span className='text-danger'>
						<p className='english'>Important announcement: CSA is a non-profit student organization under the UF Student Government. 
						This application serves only as a platform for new international students to find a ride home.
						CSA never charges new students in any way shape or form. If you come across a volunteer that asks for a payment,
						please <a href='mailto:ufcsainfo@gmail.com'>inform CSA</a> immediately, or contact a CSA member to report the incident. </p>
						<p className='chinese'>重要声明：CSA作为UF学生政府下属的官方非营利性组织，本接机系统的作用仅限于提供新同学联系志愿者接机的平台，
							CSA不以任何形式向新同学收费。如遇志愿者收费行为，请及时与我们<a href='mailto:ufcsainfo@gmail.com'>联系</a>。</p>
					</span>
				</div>
				<br />
			</div>
			<div className='main_body'>
				<div className='body_detail'>
					<p className='bottom'>
						<br />© Copyright 2020 UFCSA Chinese Student
						<br />Association at University of Florida
						<br />佛罗里达大学中国学生会
						<br />All Rights Reserved.
					</p>
				</div>
			</div>
		</section>
	);
}

function NoMatch () {
	return <p>404 Not Found</p>;
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
	constructor (props) {
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

	render () {
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
						component: EditPassword,
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
				<div className=''>
					<Switch>{navListRouting(allRouteList, isAuth)}</Switch>
				</div>
			</div>
		);
	}
}

export default AuthRoute;
