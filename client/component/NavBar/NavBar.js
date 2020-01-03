import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal } from 'antd';
import browserCookie from 'browser-cookies';
import { logoutRedux } from '../../redux/user.redux';

const { SubMenu } = Menu;

@withRouter
@connect(
  state => state,
  { logoutRedux }
)
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
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
    const list = this.props.data.filter(v => !v.hide);
    const Item = Menu.Item;
    return (
      <div>
        <Menu mode='horizontal'>
          {list.map(choice => {
            // if(choice.text === 'My Requests') {
            //   return <SubMenu
            //     key={choice.text}
            //     title={
            //       <span className='submenu-title-wrapper'
            //         >{choice.text}</span>
            //     }>
            //       {choice.subItem.map(sub => {
            //         return <Item 
            //           key={sub.text}
            //           onClick={() => (this.props.history.push(sub.path))}>
            //             {sub.text}
            //           </Item>
            //       })}
            //     </SubMenu>
            // }
            if (choice.text !== 'Logout') {
              return <Item
                key={choice.text}
                className={choice.className}
                onClick={() => (this.props.history.push(choice.path))}>
                {choice.text}
                </Item>;
            } else {
              return <Item
                key={choice.text}
                className={choice.className}
                onClick={() => (this.logout())}>
                  {choice.text}
                </Item>
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