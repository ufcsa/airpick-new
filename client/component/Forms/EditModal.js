/**
 * This model is a modal that used to MODIFY selected PICK request.
 */

import React from 'react';
// import { Form } from '@ant-design/compatible';
// import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input, DatePicker, TimePicker, InputNumber } from 'antd';
import moment from 'moment-timezone';

const { TextArea } = Input;

class EditForm extends React.Component {
	formRef = React.createRef();
	render () {
		const { visible, onCancel, onCreate, data } = this.props; // all these values are passed from its parent component 'MyReqList'
		// const { getFieldDecorator } = this.props.form;
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
				{data ? (
					<Modal
						width={700}
						visible={visible}
						title='Update Pickup Request'
						onOk={() => {
							const { current } = this.formRef;
							current
								.validateFields()
								.then(values => {
									current.resetFields();
									onCreate(values, data.key);
								})
								.catch(info => {
									// console.log('Update failed:', info);
								});
						}}
						onCancel={onCancel}
					>
						<Form
							{...formItemLayout}
							initialValues={{
								date: moment(data.arrivalTime).tz('America/New_York'),
								time: moment(data.arrivalTime).tz('America/New_York'),
								airport: data.airport,
								carryon: data.carryon,
								luggage: data.luggage,
								notes: data.notes
							}}
							ref={this.formRef}
						>
							{/* <Form.Item label='Publish'>
                {getFieldDecorator('publish')(<Switch autoFocus defaultChecked={data.published}></Switch>)}
              </Form.Item> */}

							{/* <Form.Item label='Date'>
                {getFieldDecorator('date',
                  { ...requirement, initialValue: moment(data.arrivalTime).tz('America/New_York') }
                )(<DatePicker format={dateFormat} />)}
              </Form.Item> */}
							<Form.Item label='Date' name='date' rules={requirement.rules}>
								<DatePicker disabledDate={disabledDate} format={dateFormat} />
							</Form.Item>
							{/* <Form.Item label='Time'>
                {getFieldDecorator('time',
                  { ...requirement, initialValue: moment(data.arrivalTime).tz('America/New_York') }
                )(<TimePicker format={timeFormat} />)}
              </Form.Item> */}
							<Form.Item label='Time' name='time' rules={requirement.rules}>
								<TimePicker format={timeFormat} />
							</Form.Item>
							{/* <Form.Item label='Airport/Location'>
                {getFieldDecorator('airport',
                  { ...requirement, initialValue: data.airport }
                )(<Input placeholder='MCO' />)}
              </Form.Item> */}
							<Form.Item
								label='Airport/Location'
								name='airport'
								rules={requirement.rules}
							>
								<Input placeholder='MCO' />
							</Form.Item>
							{/* <Form.Item label='Number of Carry-ons'>
                {getFieldDecorator('carryon',
                  { ...requirement, initialValue: data.carryon }
                )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
              </Form.Item> */}
							<Form.Item
								label='Number of Carry-ons'
								name='carryon'
								rules={requirement.rules}
							>
								<InputNumber min={0} max={10} placeholder={2}></InputNumber>
							</Form.Item>
							{/* <Form.Item label='Number of large luggages'>
                {getFieldDecorator('luggage',
                  { ...requirement, initialValue: data.luggage }
                )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
              </Form.Item> */}
							<Form.Item
								label='Number of large luggages'
								name='luggage'
								rules={requirement.rules}
							>
								<InputNumber min={0} max={10} placeholder={2}></InputNumber>
							</Form.Item>
							{/* <Form.Item label='Notes'>
                {getFieldDecorator('notes',
                  { initialValue: data.notes }
                )(<TextArea placeholder='How many people coming with you?'></TextArea>)}
              </Form.Item> */}
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

// const WrappedEditForm = Form.create({ name: 'edit_form ' })(EditForm);
// export default WrappedEditForm;
export default EditForm;
