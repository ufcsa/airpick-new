import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Modal, Avatar } from 'antd';
import browserCookie from 'browser-cookies';
import { logoutRedux } from '../../redux/user.redux';

const { Item, SubMenu } = Menu;

// deep filter an item in a high dimensional array
const deepFilter = (arr, filterFunc) => {
	for (let i = 0; i < arr.length; i++) {
		let element = arr[i];
		if (element.subItem) {
			const item = deepFilter(element.subItem, filterFunc);
			if (item) {
				return item;
			}
		}
	}
	return arr.filter(filterFunc)[0];
};

@withRouter
@connect(state => state, { logoutRedux })
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

	componentWillUnmount() {
		window.removeAllListener('resize');
	}

	updateWindowSize = e => {
		this.setState({ ...this.state, screenWidth: e.target.innerWidth });
	};

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
	};

	handleCancel = e => {
		this.setState({
			modalVisible: false
		});
	};

	// helper function to handle sign out in a submenu
	handleUserCenter = subItem => {
		return subItem.map(item => {
			if (item.text !== 'Sign out') {
				return (
					<Item
						key={item.text}
						onClick={() => this.props.history.push(item.path)}
					>
						{item.text}
					</Item>
				);
			} else {
				return (
					<Item key='logout' onClick={() => this.logout()}>
						Sign out
					</Item>
				);
			}
		});
	};

	render() {
		let currItem = null;
		if (this.props.location) {
			currItem = deepFilter(
				this.props.data,
				v => v.path === this.props.location.pathname
			);
			console.log(currItem);
		}
		const list = this.props.data.filter(v => !v.hide);
		const displayName = this.props.user.displayName;

		return (
			<React.Fragment>
				{/* {currItem ? ( */}
				<div>
					<Menu
						mode='horizontal'
						selectedKeys={(() => {
							if (currItem) return [currItem.text];
							else {
								return [];
							}
						})()}
					>
						{list.map(choice => {
							if (
								choice.text !== 'Sign out' &&
								choice.text !== 'No match' &&
								choice.text !== 'Volunteer' &&
								choice.text !== 'usercenter'
							) {
								return (
									<Item
										key={choice.text}
										className={choice.className}
										onClick={() => this.props.history.push(choice.path)}
									>
										{choice.text}
									</Item>
								);
							} else if (choice.text === 'Volunteer') {
								const subList = choice.subItem;
								return (
									<SubMenu key={choice.text} title={choice.text}>
										{subList.map(item => {
											return (
												<Item
													key={item.text}
													onClick={() => this.props.history.push(item.path)}
												>
													{item.text}
												</Item>
											);
										})}
									</SubMenu>
								);
							} else if (choice.text === 'usercenter') {
								if (this.state.screenWidth >= 560) {
									return (
										<SubMenu
											key={choice.text}
											className={choice.className}
											title={
												<React.Fragment>
													<Avatar style={{ verticalAlign: 'middle' }}>
														{displayName.charAt(0)}
													</Avatar>
													&nbsp; &nbsp;
													{displayName}
												</React.Fragment>
											}
										>
											{/* {choice.subItem.map(item => {
											return <Item key={item.text}>{item.text}</Item>;
										})} */}
											{this.handleUserCenter(choice.subItem)}
										</SubMenu>
									);
								} else if (this.state.screenWidth >= 477) {
									return (
										<SubMenu
											key={choice.text}
											className={choice.className}
											title={
												<React.Fragment>
													<Avatar style={{ verticalAlign: 'middle' }}>
														{displayName.charAt(0)}
													</Avatar>
												</React.Fragment>
											}
										>
											{choice.subItem.map(item => {
												return <Item key={item.text}>{item.text}</Item>;
											})}
										</SubMenu>
									);
								} else {
									return (
										<SubMenu
											key={choice.text}
											title={
												<div style={{ marginLeft: 0, marginRight: 15 }}>
													<Avatar style={{ verticalAlign: 'middle' }}>
														{displayName.charAt(0)}
													</Avatar>
													&nbsp; {displayName}
												</div>
											}
										>
											{choice.subItem.map(item => {
												return <Item key={item.text}>{item.text}</Item>;
											})}
										</SubMenu>
									);
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
					>
						Are you sure you want to log out?
					</Modal>
				</div>
				{/* ) : null} */}
			</React.Fragment>
		);
	}
}

export default NavBar;
