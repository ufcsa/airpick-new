import React from 'react';

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      choice: 1
    };
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