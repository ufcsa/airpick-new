/**
 * This model is a modal that used to add NEW LODGE requests.
 */

import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input, DatePicker } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

class LodgereqForm extends React.Component {
	constructor () {
		super();
		this.lodgeFormRef = React.createRef();
		this.state = {
			startDate: null
		};
	}

	render () {
		const { visible, onCancel, onCreate } = this.props; // values/functions passed from its parent component 'RequestCenter'
		const formItemLayout = {
			labelCol: {
				xs: { span: 20 },
				sm: { span: 10 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 10 }
			}
		};
		const dateFormat = 'YYYY-MM-DD';
		const disabledStartDate = current => {
			return current && current < moment().endOf('day');
		};
		const disabledEndDate = current => {
			if (this.state.startDate)
				return current && current < this.state.startDate.endOf('day');
			else
				return current && current < moment(new Date()).tz('America/New_York').endOf('day');
		};

		const requirement = {
			rules: [
				{
					required: true,
					message: 'Please fill this field!'
				}
			]
		};

		return (
			<div>
				<Modal
					width={700}
					visible={visible}
					title='Add New Lodge Request'
					onOk={() => {
						// console.log(this.lodgeFormRef);
						const { current } = this.lodgeFormRef;

						current
							.validateFields()
							.then(values => {
								current.resetFields();
								onCreate(values);
							})
							.catch(info => {
								console.log('Update failed:', info);
							});
					}}
					onCancel={onCancel}
				>
					<Form {...formItemLayout} ref={this.lodgeFormRef}>
						<Form.Item label='Start Date' name='startDate' rules={requirement.rules}>
							<DatePicker disabledDate={disabledStartDate} format={dateFormat} onChange={(date) => this.setState({ startDate: date })} />
						</Form.Item>
						<Form.Item label='Leave Date' name='leaveDate' rules={requirement.rules}>
							<DatePicker disabledDate={disabledEndDate} format={dateFormat} />
						</Form.Item>
						<Form.Item
							label='Pick-up location'
							name='pickupLocation'
							rules={requirement.rules}
						>
							<Input placeholder='GNV' />
						</Form.Item>
						<Form.Item label='Notes' name='notes'>
							<TextArea placeholder='How many people coming with you?'></TextArea>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default LodgereqForm;
