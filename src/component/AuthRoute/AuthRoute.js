import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Login from '../../container/auth/Login';


function Home() {
  return <h2>Airpick homepage</h2>
}

function Register() {
  return <h2>Register page</h2>
}
@withRouter
@connect(state=>state.user, {loadData})
class AuthRoute extends React.Component {
  componentWillMount() {

  }

  render() {
    const isAuth = this.props.user.isAuth;
    const navList = [
      {
        path: '/home',
        text: 'Airpick',
        key: 'home',
        component: 'Home',
        hide: false
      },
      {
        path: '/login',
        text: 'login',
        key: 'login',
        component: 'Login',
        hide: isAuth
      },
      {
        path: '/register',
        text: 'register',
        key: 'register',
        component: 'Register',
        hide: isAuth
      },
      {
        text: 'logout',
        key: 'logout',
        hide: !isAuth
      }
    ];

    return (
      <Fragment>
        <NavBar data={navList}>
        </NavBar>
      </Fragment>
    )
  }
}