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

function MyRequest() {
  return <h2>My Request</h2>
}

@withRouter
@connect(state => state.user, { loadData })
class AuthRoute extends React.Component {
  constructor(props) {
    super(props);
    console.log('checking if logged')
    axios.get('/api/user/info')
      .then(res => {
        if(res.status === 200) {
          if(res.data.code === 0) {
            this.props.loadData(res.data.data);
          } else {
            this.props.history.push('/login');
          }
        }
      });
  }

  render() {
    const isAuth = this.props.isAuth;
    const rightNavbarClass = 'navbar-right'
    const navList = [
      {
        path: '/home',
        text: 'UF CSA Airpick',
        component: Home,
        className: 'navbar-title',
        hide: false
      },
      {
        path: '/addreq',
        text: 'My Requests',
        component: MyRequest,
        className: '',
        hide: !isAuth
      },
      {
        path: '/register',
        text: 'Register',
        component: Register,
        className: rightNavbarClass,
        hide: isAuth
      },
      {
        path: '/login',
        text: 'Login',
        component: Login,
        className: rightNavbarClass,
        hide: isAuth
      },
      {
        text: 'Logout',
        className: rightNavbarClass,
        hide: !isAuth
      }
    ];
    console.log(isAuth);
    return (
      <div>
        <NavBar data={navList}></NavBar>
        <Switch>
          {navList.map(op => {
            if(op.text !== 'Logout') {
              return <Route key={op.text} path={op.path} component={op.component}></Route>
            } else {
              
            }
          })}
        </Switch>
      </div>
    )
  }
}

export default AuthRoute;