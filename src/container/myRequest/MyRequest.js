import React from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

class MyRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
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
        <Sider width='150' theme='light' collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" onClick={() => (this.changeChoice(1))}>
              <Icon type="car" />
              <span>Pickup</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => (this.changeChoice(2))}>
              <Icon type="wifi" />
              <span>Lodging</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          Pick Req
        </Layout>
      </Layout>
        )
      }
}

export default MyRequest;