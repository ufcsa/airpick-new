import React from 'react';
import { connect } from 'react-redux';
import { Table, Button, message } from 'antd';
import moment from 'moment-timezone';
import { loadAllReq, acceptReq } from '../../redux/request.redux';

const { Column } = Table;

@connect(state => state, { loadAllReq, acceptReq })
class ReqList extends React.Component {
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
		console.log(request);
		console.log(this.props.user.username);
		const reqId = request._id;
		const volunteer = this.props.user.username;
		this.props.acceptReq(reqId, volunteer, this.props.request.list).then(() => {
			message.success(this.props.request.msg);
		});
	};

	render() {
		return (
			<div>
				<Table
					dataSource={this.props.request.list}
					loading={this.state.loading}
					pagination={false}
					tableLayout='fixed'
				>
					<Column
						title='Accept'
						key='accept'
						render={(text, record) => {
							// TODO: add click event
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
					<Column title='Name' dataIndex={['user', 'displayName']} key='name' />
					<Column
						title='Time'
						key='time'
						render={(text, record) => {
							return moment(record.request.arrivalTime)
								.tz('America/New_York')
								.format('ddd, MMM Do YYYY HH:mm');
						}}
					></Column>
					<Column
						title='Airport/Address'
						dataIndex={['request', 'airport']}
						key='airport'
					></Column>
					<Column
						title='Luggage'
						dataIndex={['request', 'luggage']}
						key='luggage'
					></Column>
					<Column
						title='Carryon'
						dataIndex={['request', 'carryon']}
						key='carryon'
					></Column>
					<Column
						title='Notes'
						dataIndex={['request', 'notes']}
						key='notes'
					></Column>
				</Table>
			</div>
		);
	}
}

export default ReqList;
