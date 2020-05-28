import React from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	CheckCircleTwoTone,
	LoadingOutlined
} from '@ant-design/icons';
import { Table, Button, Tooltip, Steps } from 'antd';
import moment from 'moment-timezone';
import EditModal from './EditModal';
import VolunteerModel from './VolunteerInfoModal';
import { connect } from 'react-redux';
import { updatePickreq, deletePickreq, loadPickreq } from '../../redux/airpick.redux';

const { Column } = Table;
const { Step } = Steps;

@connect(state => state, { updatePickreq, deletePickreq, loadPickreq })
class MyReqList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			visible: false,
			volunteerInfoVisible: false
		};
	}

	// open the modal
	handleEdit = request => {
		this.setState({ ...this.state, visible: true, data: request });
	};

	// delete the record
	handleDelete = request => {
		// call the function from redux
		this.props.deletePickreq(request)
			.then(() => this.props.loadPickreq(this.props.user.username));
	};

	// handle update the current reqeust
	handleSubmit = (values, reqId) => {
		console.log('submitting update');
		this.setState({ visible: false, data: null, loading: true });
		// Should format date value before submit.
		const updatePickReqVal = {
			...values,
			publish: true,
			notes: values.notes ? values.notes : '',
			date: values.date.format('YYYY-MM-DD'),
			time: values.time.format('HH:mm'),
			username: this.props.user.username,
		};
		this.props.updatePickreq(updatePickReqVal, reqId)
			.then(() => this.setState({ ...this.state, loading: false}));
	};

	handleCancel = () => {
		this.setState({ visible: false, data: null });
	};

	updateForm = formRef => {
		this.formRef = formRef;
	};

	showVolunteerInfo = data => {
		console.log(data);
		this.setState({
			...this.state,
			volunteerInfoVisible: true,
			volunteerInfo: data
		});
	};

	closeVolunteerModal = () => {
		this.setState({ volunteerInfoVisible: false });
	};

	render() {
		const tmp = this.props.data;  // parsed in from MyRequestCenter.js
		const list = tmp.map(item => {
			return {
				key: item._id,
				date: moment(item.arrivalTime)
					.tz('America/New_York')
					.format('YYYY-MM-DD'),
				time: moment(item.arrivalTime)
					.tz('America/New_York')
					.format('HH:mm'),
				arrivalTime: item.arrivalTime,
				airport: item.airport,
				volunteer: item.volunteer,
				published: item.published,
				carryon: item.carryon,
				luggage: item.luggage,
				notes: item.notes
			};
		});


		return (
			<div>
				<div>
					<Table
						dataSource={list}
						loading={this.state.loading}
						pagination={false}
					>
						<Column title='Date' dataIndex='date' key='date' />
						<Column title='Time' dataIndex='time' key='time' />
						<Column title='Airport' dataIndex='airport' key='airport' />
						<Column
							title='Action'
							key='action'
							render={(text, record) => {
								return (
									<div>
										<Tooltip title='Edit'>
											<Button
												type='default'
												icon={<EditOutlined />}
												shape='circle'
												style={{ marginRight: 10 }}
												onClick={() => this.handleEdit(record)}
											></Button>
										</Tooltip>

										<Tooltip title='Delete'>
											<Button
												type='danger'
												icon={<DeleteOutlined />}
												shape='circle'
												onClick={() => this.handleDelete(record)}
											></Button>
										</Tooltip>
									</div>
								);
							}}
						></Column>
						<Column
							title='Status'
							key='status'
							render={(text, record) => {
								const status = record.volunteer
									? 2
									: record.published
										? 1
										: 0;
								if (status === 0) {
									return (
										<Step
											status='finish'
											title='trip finished!'
											icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
										></Step>
									);
								} else if (status === 1) {
									return (
										<Step
											status='process'
											title='Looking for volunteers..'
											icon={<LoadingOutlined />}
										></Step>
									);
								} else {
									return (
										<Button
											type='primary'
											onClick={() =>
												this.showVolunteerInfo(
													record.volunteer
												)
											}
										>
												Show Volunteer Info
										</Button>
									);
								}
							}}
						></Column>
					</Table>
					<EditModal
						wrappedComponentRef={this.updateForm}
						visible={this.state.visible}
						onCreate={this.handleSubmit}
						onCancel={this.handleCancel}
						data={this.state.data}
					></EditModal>
					<VolunteerModel
						visible={this.state.volunteerInfoVisible}
						volunteerInfo={this.state.volunteerInfo}
						onCancel={this.closeVolunteerModal}
						onOk={this.closeVolunteerModal}
					></VolunteerModel>
					
				</div>
			</div>
		);
	}
}

export default MyReqList;
