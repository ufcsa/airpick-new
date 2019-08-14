import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';


@withRouter
@connect(
  state=>state
)
class NavBar extends React.Component {
  render() {
    const list = this.props.data.filter(v => !v.hide);
    const Item = Menu.Item;
    const { pathname } = this.props.location;
    return (
      <div>
        <Menu mode='horizontal'>
          {list.map(choice => (
            <Item>
              {choice.text}
            </Item>
          ))}
        </Menu>
      </div>
    )
  }
}

export default NavBar;