import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import { useSelector } from 'react-redux';

export default function ChangePassword () {
	const user = useSelector(state => state.user);
	const history = useHistory();

	const formItemLayout = {
		labelCol: {
			xs: { span: 18 },
			sm: { span: 8 }
		},
		wrapperCol: {
			xs: { span: 18 },
			sm: { span: 10 }
		}
	};

	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0
			},
			sm: {
				span: 16,
				offset: 8
			}
		}
	};
  
	const [form] = Form.useForm();
  
	const onFinish = function submitForm (values) {
		axios.put(
			'/api/user/editpassword',
			{ 
				username: user.username, 
				newPassword: values.newPass, 
				oldPassword: values.oldPass 
			},
		).then((res) => {
			if (res.data.code === 0) {
				message.success('Update password successfully!');
				history.push('/myrequestcenter');
			} else {
				message.error(res.data.msg);
			}
		}).catch();
	};

	const onFinishFailed = function submitFormFailed (errorInfo) {
		// console.log(errorInfo);
		form.scrollToField(errorInfo.errorFields[0].name);
	};
  
	return (
		<div>
			<Form
				{...formItemLayout}
				form={form}
				name="editPassword"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					name="oldPass"
					label="Old Password"
					rules={[{ required: true, message: 'Please input your old password' }]}
				>
					<Input.Password></Input.Password>
				</Form.Item>
				<Form.Item
					name="newPass"
					label="New Password"
					rules={[{ required: true, message: 'Please input your old password' }]}
					hasFeedback
				>
					<Input.Password></Input.Password>
				</Form.Item>
				<Form.Item
					name="confirmNewPass"
					label="Confirm New Password"
					dependencies={['newPass']}
					hasFeedback
					rules={[
						{ required: true, message: 'Please confirm your new password' },
						({ getFieldValue }) => ({
							validator (rule, value) {
								if (!value || getFieldValue('newPass') === value) {
									return Promise.resolve();
								}
								return Promise.reject('Two paswords you entered do not match!');
							}
						})
					]}
				>
					<Input.Password></Input.Password>
				</Form.Item>
				<Form.Item 
					{...tailFormItemLayout}
				>
					<Button type="primary" htmlType="submit">
            Update
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}