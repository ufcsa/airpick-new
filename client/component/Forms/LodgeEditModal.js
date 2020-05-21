/**
 * This model is a modal that used to MODIFY selected LODGE request.
 */

import React from 'react';
import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input, DatePicker} from 'antd';
import moment from 'moment';

const { TextArea } = Input;

class LodgeEditForm extends React.Component {
	formRef = React.createRef();
	render() {
		const { lodgeVisible, onCancel, onCreate, data } = this.props; // all these values are passed from its parent component 'MyLodgeList
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
				{data ? (
					<Modal
						width={700}
						visible={lodgeVisible}
						title='Update New Lodge Request'
						onOk={() => {
							const { current } = this.formRef;
							current
								.validateFields()
								.then(values => {
									current.resetFields();
									onCreate(values, data.key);
								})
								.catch(info => {
									console.log('Update lodge failed:', info);
								});
						}}
						onCancel={onCancel}
					>
						<Form
							{...formItemLayout}
							initialValues={{
								startDate: moment(data.startDate).tz('America/New_York'),
								leaveDate: moment(data.leaveDate).tz('America/New_York'),
								pickupLocation: data.pickupLocation,
								notes: data.notes
							}}
							ref={this.formRef}
						>
							<Form.Item label='Start Date' name='startDate' rules={requirement.rules}>
								<DatePicker disabledDate={disabledDate} format={dateFormat} />
							</Form.Item>
							<Form.Item label='Leave Date' name='leaveDate' rules={requirement.rules}>
								<DatePicker disabledDate={disabledDate} format={dateFormat} />
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
				) : null}	
			</div>
		);
	}
}

export default LodgeEditForm;
