/**
 *  List my request's status including volunteer info
 */

import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { updatePickreq, loadPickreq } from '../../redux/request.redux';
import { connect } from 'react-redux';
import PickreqForm from './PickModal';
import MyReqList from './MyReqList';

@connect(state => state, { updatePickreq, loadPickreq })
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
		// Should format date value before submit.
		const updatePickreqValues = {
			...values,
			publish: true,
			notes: values.notes ? values.notes : '',
			date: values.date.format('YYYY-MM-DD'),
			time: values.time.format('HH:mm'),
			username: this.props.user.username,
			volunteer: this.props.user.volunteer
		};
		this.props.updatePickreq(updatePickreqValues).then(() => {
			this.setState({ visible: false });
		});
	};

	saveForm = formRef => {
		this.formRef = formRef;
	};

	componentDidMount() {
		this.props.loadPickreq(this.props.user.username);
	}

	render() {
		// TODO: change this.props.request to an array. One user can have multiple requests
		let previousReq = this.props.request.request;

		if (previousReq === undefined) {
			console.log('loading previous requests');
			return null;
		}

		return (
			<div style={{ textAlign: 'center' }}>
				{previousReq ? (
					<MyReqList data={previousReq}></MyReqList>
				) : (
					<div>
						<br></br>
						<br></br>
						<Button type='primary' onClick={this.showModal}>
							<PlusOutlined />
							Add Request
						</Button>
						<PickreqForm
							wrappedComponentRef={this.saveForm}
							visible={this.state.visible}
							onCreate={this.handleSubmit}
							onCancel={this.handleCancel}
						></PickreqForm>
					</div>
				)}
			</div>
		);
	}
}

export default RequestCenter;
