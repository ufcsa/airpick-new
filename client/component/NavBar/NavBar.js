import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal } from 'antd';
import browserCookie from 'browser-cookies';
import { logoutRedux } from '../../redux/user.redux';

// const { SubMenu } = Menu;

@withRouter
@connect(
  state => state,
  { logoutRedux }
)
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      screenWidth: window.innerWidth,
      location: this.props.location.pathname
    };
  }

  componentDidMount() {
    this.setState({ location: this.props.location.pathname });
    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  componentDidUpdate() {
    // this.setState({ location: this.props.location.pathname });
    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  updateWindowSize = e => {
    this.setState({ ...this.state, screenWidth: e.target.innerWidth });
  }

  logout() {
    console.log('logout');
    this.setState({
      modalVisible: true
    });
  }

  handleOk = e => {
    this.setState({
      modalVisible: false
    });

    browserCookie.erase('userid');
    this.props.history.push('/login');
    this.props.logoutRedux();
  }

  handleCancel = e => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    let currItem = null;
    if (this.props.location) {
      currItem = this.props.data.filter(v => v.path === this.props.location.pathname)[0];
    }

    const list = this.props.data.filter(v => !v.hide);
    const { Item, SubMenu } = Menu;
    return (
      <div>
        <Menu mode='horizontal' selectedKeys={[currItem.text]}>
          {list.map(choice => {
            if (choice.text !== 'Logout' && choice.text !== 'No match' && choice.text !== 'Volunteer') {
              return (<Item
                key={choice.text}
                className={choice.className}
                onClick={() => (this.props.history.push(choice.path))}>
                {choice.text}
              </Item>);
            } else if (choice.text === 'Volunteer') {
              const subList = choice.subItem;
              return <SubMenu key={choice.text} title={choice.text}>
                {subList.map(item => {
                  return (<Item
                    key={item.text}
                    onClick={() => (this.props.history.push(item.path))}
                  >
                    {item.text}
                  </Item>)
                })}
              </SubMenu>
            } else if (choice.text !== 'No match') {
              if (this.state.screenWidth > 489) {
                return <Item
                  key={choice.text}
                  className={choice.className}
                  onClick={() => (this.logout())}>
                  {choice.text}
                </Item>
              } else {
                return <Item
                  key={choice.text}
                  className=''
                  onClick={() => (this.logout())}>
                  {choice.text}
                </Item>
              }
            } else {
              return null;
            }
          })}
        </Menu>
        <Modal
          title='Log out?'
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >Are you sure you want to log out?</Modal>
      </div>
    )
  }
}

export default NavBar;