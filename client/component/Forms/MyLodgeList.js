import React from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	CheckCircleTwoTone,
	LoadingOutlined
} from '@ant-design/icons';
import { Table, Button, Tooltip, Steps } from 'antd';
import moment from 'moment-timezone';
import LodgeEditModal from './LodgeEditModal';
import VolunteerModel from './VolunteerInfoModal';
import { connect } from 'react-redux';
import { updateLodgereq, deleteLodgereq, loadLodgereq } from '../../redux/lodge.redux';

const { Column } = Table;
const { Step } = Steps;

@connect(state => state, { updateLodgereq, deleteLodgereq, loadLodgereq })
class MyLodgeList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			lodgeVisible: false,
			volunteerInfoVisible: false
		};
	}

	// open the modal
	handleEdit = request => {
		this.setState({ ...this.state, lodgeVisible: true, lodgeData: request });
	};

	// delete the record
	handleDelete = request => {
		// call the function from redux
		this.props.deleteLodgereq(request)
			.then(() => this.props.loadLodgereq(this.props.user.username));
	};

	// handle update the current lodge request
	handleSubmit = (values, reqId) => {
		console.log('submitting update');
		this.setState({ lodgeVisible: false, lodgeData: null, loading: true });
		// Should format date value before submit.
		const updateLodgeReqVal = {
			...values,
			publish: true,
			notes: values.notes ? values.notes : '',
			startDate: values.startDate.format('YYYY-MM-DD'),
			leaveDate: values.leaveDate.format('YYYY-MM-DD'),
			username: this.props.user.username,
		};
		this.props.updateLodgereq(updateLodgeReqVal, reqId)
			.then(() => this.setState({ ...this.state, loading: false }));
	};

	handleCancel = () => {
		this.setState({ lodgeVisible: false, lodgeData: null });
	};

	updateForm = formRef => {
		this.formRef = formRef;
	};

	showVolunteerInfo = volunteerInfo => {
		this.setState({
			...this.state,
			volunteerInfoVisible: true,
			volunteerInfo: volunteerInfo
		});
	};

	closeVolunteerModal = () => {
		this.setState({ volunteerInfoVisible: false });
	};

	render () {
		const tmp = this.props.lodgeData;  // parsed in from MyRequestCenter.js
		const list = tmp.map(item => {
			return {
				key: item._id,
				startDate: moment(item.startDate)
					.tz('America/New_York')
					.format('YYYY-MM-DD'),
				leaveDate: moment(item.leaveDate)
					.tz('America/New_York')
					.format('YYYY-MM-DD'),
				pickupLocation: item.pickupLocation,
				volunteer: item.volunteer,
				published: item.published,
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
						<Column title='Start Date' dataIndex='startDate' key='startDate' />
						<Column title='Leave Date' dataIndex='leaveDate' key='leaveDate' />
						<Column title='Pickup Location' dataIndex='pickupLocation' key='pickupLocation' />
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
					<LodgeEditModal
						wrappedComponentRef={this.updateForm}
						lodgeVisible={this.state.lodgeVisible}
						onCreate={this.handleSubmit}
						onCancel={this.handleCancel}
						lodgeData={this.state.lodgeData}
					></LodgeEditModal>
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

export default MyLodgeList;
