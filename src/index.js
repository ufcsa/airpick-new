import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';  //for async in redux
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import './loading';
import reducers from './reducers';
import Login from './container/auth/Login';
import Register from './container/auth/Register';
import AuthRoute from './component/AuthRoute/AuthRoute';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension? window.devToolsExtension() : ()=>{}
));

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        {/* <NavBar></NavBar> */}
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ), document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
