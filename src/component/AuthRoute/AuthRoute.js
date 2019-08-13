import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';

@withRouter
@connect(state=>state.user, {loadDate})
class AuthRoute extends React.Component {
  componentDidMount() {
    
  }
}