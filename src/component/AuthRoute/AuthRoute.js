import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from '../../container/auth/Login';
import Register from '../../container/auth/Register';

function Home() {
  return <h2>Airpick homepage</h2>
}

@withRouter
@connect(state => state.user, { loadData })
class AuthRoute extends React.Component {
  componentWillMount() {

  }

  render() {
    const isAuth = this.props.isAuth;
    const navList = [
      {
        path: '/home',
        text: 'Airpick',
        key: 'home',
        component: Home,
        hide: false
      },
      {
        path: '/login',
        text: 'login',
        key: 'login',
        component: Login,
        hide: isAuth
      },
      {
        path: '/register',
        text: 'register',
        key: 'register',
        component: Register,
        hide: isAuth
      },
      {
        text: 'logout',
        key: 'logout',
        hide: !isAuth
      }
    ];
    console.log(isAuth);
    return (
      <div>
        <NavBar data={navList}></NavBar>
        <Switch>
          {navList.map(op => {
            if(op.text !== 'logout') {
              return <Route key={op.path} path={op.path} component={op.component}></Route>
            } else {
              
            }
          })}
        </Switch>
      </div>
    )
  }
}

export default AuthRoute;