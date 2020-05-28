import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, message, ConfigProvider } from 'antd';
import moment from 'moment-timezone';
import { loadAllReq, acceptReq } from '../../redux/lodge.redux';
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
		console.log(1);
		const reqId = request._id;
		const volunteer = this.props.user.username;
		this.props.acceptReq(reqId, volunteer, this.props.lodge.list).then(() => {
			console.log(this.props);
			message.success(this.props.airpick.msg, 1);
		});
	};

	render() {
		console.log(this.props);
		return (
			<div>
				<ConfigProvider renderEmpty={RenderEmpty}>
					<Table
						dataSource={this.props.lodge.list}
					
						loading={this.state.loading}
						pagination={{ hideOnSinglePage:true,showQuickJumper:true }}
						tableLayout='fixed'
					>
						<Column
							title='Accept'
							key='accept'
							render={(text, record) => {								
								if (this.props.user.username === record.request.username) {
									return (
										<Button type='ghost' size='small' disabled>
											Accept
										</Button>
									);
								}
								return (
									<Button
										type='primary'
										size='small'
										onClick={() => this.handleAccept(record.request)}
									>
										Accept
									</Button>
								);
							}}
						></Column> 
						<Column
							title='Name'
							dataIndex={['user', 'displayName']}
							key='name'
						/>
						<Column
							title='Pickup Location'
							dataIndex={['request', 'pickupLocation']}
							key='pickupLocation'
						/>
						<Column
							title='Start date'
							key='stateDate'
							render={(text, record) => {
								return moment(record.request.startDate)
									.tz('America/New_York')
									.format('ddd, MMM Do YYYY HH:mm');
							}}
						></Column>
						<Column
							title='Leave date'
							key='leaveDate'
							render={(text, record) => {
								return moment(record.request.leaveDate)
									.tz('America/New_York')
									.format('ddd, MMM Do YYYY HH:mm');
							}}
						></Column>
						<Column
							title = "Notes"
							key="nontes"
							dataIndex = {['request','notes']}
						></Column>
						<Column
							title = "Created at"
							key="createdAt"
							//dataIndex = {['request','createdAt']}
							render={(text, record) => {
								return moment(record.request.createdAt)
									.tz('America/New_York')
									.format('ddd, MMM Do YYYY HH:mm');
							}}
						></Column>
					</Table>
					
				</ConfigProvider>
			</div>
		);
	}
}

export default LodgeReqList;
