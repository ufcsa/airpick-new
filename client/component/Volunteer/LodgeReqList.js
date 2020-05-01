import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, message, ConfigProvider } from 'antd';
import moment from 'moment-timezone';
import { loadAllReq, acceptReq } from '../../redux/request.redux';
import RenderEmpty from '@/component/Empty/CustomEmpty';

const { Column } = Table;

@connect(state => state, { loadAllReq, acceptReq })
class LodgeReqList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.props.loadAllReq().then(() => {
			this.setState({ loading: false });
		});
	}

	handleAccept = request => {
		// console.log(request);
		// console.log(this.props.user.username);
		// const reqId = request._id;
		// const volunteer = this.props.user.username;
		// this.props.acceptReq(reqId, volunteer, this.props.request.list).then(() => {
		// 	message.success(this.props.request.msg, 1);
		// });
	};

	render() {
		console.log(this.props.request.list);
		return (
			<div>
				<ConfigProvider renderEmpty={RenderEmpty}>
					<Table
						dataSource={[{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1},{age:1}]}
					
						loading={this.state.loading}
						pagination={{ hideOnSinglePage:true,showQuickJumper:true,responsive:true }}
						tableLayout='fixed'
					>
						 <Column title="Age" dataIndex="age" key="age" />
					</Table>
				</ConfigProvider>

			</div>
		);
	}
}

export default LodgeReqList;
