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
								console.log('Update failed:', info);
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
					<div style={{ color: 'red' }}>
						(由于MCO到Gainesville的路程比较遥远，可以从MCO接送新生回Gainesville的志愿者很少。
						如果你的降落机场是MCO，而且你愿意乘坐大巴去Gainesville，可以在Notes开头用英文加一句“I am looking for a ride from MCO to a bus station in Orlando.”这样的话有较大几率会有奥兰多本地的志愿者把你接到大巴站，然后你可以坐大巴来Gainesville。)
					</div>
				</Modal>
			</div>
		);
	}
}

export default PickreqForm;
