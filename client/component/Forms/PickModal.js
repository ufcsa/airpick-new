/**
 * This model is a modal that used to add NEW Pick requests.
 */

import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input, DatePicker, TimePicker, InputNumber } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

class PickreqForm extends React.Component {
	formRef = React.createRef();
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
		const timeFormat = 'HH:mm';
		const disabledDate = current => {
			return current && current < moment().endOf('day');
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
					title='Add New Pickup Request'
					onOk={() => {
						// console.log(this.formRef);
						const { current } = this.formRef;

						current
							.validateFields()
							.then(values => {
								current.resetFields();
								onCreate(values);
							})
							.catch(info => {
								// console.log('Update failed:', info);
							});
					}}
					onCancel={onCancel}
				>
					<Form {...formItemLayout} ref={this.formRef}>
						<Form.Item label='Date' name='date' rules={requirement.rules}>
							<DatePicker disabledDate={disabledDate} format={dateFormat} />
						</Form.Item>
						<Form.Item label='Time' name='time' rules={requirement.rules}>
							<TimePicker autoFocus format={timeFormat} />
						</Form.Item>
						<Form.Item
							label='Airport/Location'
							name='airport'
							rules={requirement.rules}
						>
							<Input placeholder='MCO' />
						</Form.Item>
						<Form.Item
							label='Number of Carry-ons'
							name='carryon'
							rules={requirement.rules}
						>
							<InputNumber min={0} max={10} placeholder={2}></InputNumber>
						</Form.Item>
						<Form.Item
							label='Number of large luggages'
							name='luggage'
							rules={requirement.rules}
						>
							<InputNumber min={0} max={10} placeholder={2}></InputNumber>
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

export default PickreqForm;
