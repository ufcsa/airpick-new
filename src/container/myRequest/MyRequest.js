import React from 'react';
import { connect } from 'react-redux';
import { loadPickreq } from '../../redux/request.redux';

@connect(
  state=> state,
  { loadPickreq }
)
class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.props.request.redirectTo = null;
    this.props.loadPickreq(this.props.user.username);
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <h1>My request</h1>
    )
  }
}

export default MyRequest;