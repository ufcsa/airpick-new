/**
 *  List my request's status including volunteer info
 */

import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { addPickreq, loadPickreq } from '../../redux/airpick.redux';
import { connect } from 'react-redux';
import PickreqForm from './PickModal';
import MyReqList from './MyReqList';

@connect(state => state, { addPickreq ,loadPickreq })
class RequestCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			confirmLoading: false,
			myReq: undefined
		};
	}

	showModal = () => {
		this.setState({
			visible: true
		});
	};

	handleCancel = () => {
		this.setState({ visible: false });
	};

	// handle adding a new request
	handleSubmit = values => {
		console.log('ok clicked');
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

	saveForm = formRef => {
		this.formRef = formRef;
	};

	componentDidMount() {
		this.props.loadPickreq(this.props.user.username);
	}

	render() {
		let previousReq = this.props.airpick.myRequests;

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
					{/* <br></br>
						<br></br>
						<br></br>
						<Button type='primary' onClick={this.showModal}>
							<PlusOutlined />
							Add Lodging Request
						</Button> */}
					<PickreqForm
						wrappedComponentRef={this.saveForm}
						visible={this.state.visible}
						onCreate={this.handleSubmit}
						onCancel={this.handleCancel}
					></PickreqForm>
				</div>
			</div>
		);
	}
}

export default RequestCenter;
