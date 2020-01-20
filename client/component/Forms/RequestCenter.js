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

// decorator
// const a = () => {
//   return function (cls) {
//     return cls.b;
//   }
// }

// a()(A);

// class A {

// }
@connect(state => state, { updatePickreq, loadPickreq })
class RequestCenter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			confirmLoading: false
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

	render() {
		console.log(this.props);
		// TODO: change this.props.request to an array. One user can have multiple requests
		let previousReq = undefined;
		if (!this.props.request.request) {
			if (this.props.user.username)
				this.props.loadPickreq(this.props.user.username);
		} else {
			if (this.props.request.request.request) {
				previousReq = [];
				previousReq.push(this.props.request.request.request);
			}
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
