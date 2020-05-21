/**
 *  List my request's status including volunteer info
 */

import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { addPickreq, loadPickreq } from '../../redux/airpick.redux';
import { addLodgereq, loadLodgereq } from '../../redux/lodge.redux';
import { connect } from 'react-redux';
import PickreqForm from './PickModal';
import LodgereqForm from './LodgeModal';
import MyReqList from './MyReqList';
import MyLodgeList from './MyLodgeList';

@connect(state => state, { addPickreq ,loadPickreq, addLodgereq, loadLodgereq })
class RequestCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			confirmLoading: false,
			myReq: undefined,
			lodgeVisible: false
		};
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	showLodgeModal = () => {
		this.setState({
			lodgeVisible: true
		});
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	lodgeHandleCancel = () => {
		this.setState({ lodgeVisible: false });
	};

	// handle adding a new request
	handleSubmit = values => {
		console.log('ok airpick clicked');
		this.setState({ visible: false });
		// Should format date value before submit.
		const newPickreqValues = {
			...values,
			publish: true,
			notes: values.notes ? values.notes : '',
			date: values.date.format('YYYY-MM-DD'),
			time: values.time.format('HH:mm'),
			username: this.props.user.username,
		};
		// call API
		this.props.addPickreq(newPickreqValues);
	};

	lodgeHandleSubmit = values => {
		console.log('ok lodge clicked');
		this.setState({ lodgeVisible: false });
		// Should format date value before submit.
		const newLodgereqValues = {
			...values,
			publish: true,
			notes: values.notes ? values.notes : '',
			startDate: values.startDate.format('YYYY-MM-DD'),
			leaveDate: values.leaveDate.format('YYYY-MM-DD'),
			username: this.props.user.username,
		};
		// call API
		this.props.addLodgereq(newLodgereqValues);
	};

	saveForm = formRef => {
		this.formRef = formRef;
	};

	componentDidMount() {
		this.props.loadPickreq(this.props.user.username);
		this.props.loadLodgereq(this.props.user.username);
	}

	render() {
		let previousReq = this.props.airpick.myRequests;
		let previousLodgeReq = this.props.lodge.lodgeRequests;

		return (
			<div style={{ textAlign: 'center' }}>
				{previousReq ? (
					<MyReqList data={previousReq}></MyReqList>
				) : (null)}

				<div>
					<br></br>
					<br></br>
					<Button type='primary' onClick={this.showModal}>
						<PlusOutlined />
							Add Airpick Request
					</Button>
					<PickreqForm
						wrappedComponentRef={this.saveForm}
						visible={this.state.visible}
						onCreate={this.handleSubmit}
						onCancel={this.handleCancel}
					></PickreqForm>
					<br></br>
					<br></br>
				</div>


				{previousLodgeReq ? (
					<MyLodgeList lodgeData={previousLodgeReq}></MyLodgeList>
				) : (null)}

				<div>
					<br></br>
					<br></br>
					<Button type='primary' onClick={this.showLodgeModal}>
						<PlusOutlined />
							Add Lodging Request
					</Button>
					<LodgereqForm
						wrappedComponentRef={this.saveForm}
						visible={this.state.lodgeVisible}
						onCreate={this.lodgeHandleSubmit}
						onCancel={this.lodgeHandleCancel}
					></LodgereqForm>
					<br></br>
					<br></br>
				</div>
			</div>
		);
	}
}

export default RequestCenter;
