import React from 'react';
import { Layout } from 'antd';
import PickReq from '../../component/Requests/PickReq';
import LodgeReq from '../../component/Requests/LodgeReq';


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

  changeChoice = v => {
    this.setState({
      choice: v
    });
    console.log('v %d', v);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout>
          {this.state.choice === 1 ? <PickReq></PickReq> : <LodgeReq></LodgeReq>}
        </Layout>
      </Layout>
        )
      }
}

export default MyRequest;