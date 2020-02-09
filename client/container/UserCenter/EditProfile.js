import React from 'react';
import { useState, useEffect } from 'react'
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Typography } from 'antd';
import { useSelector, useDispatch, connect } from 'react-redux'
import { editProfile } from '../../redux/user.redux'
const Paragraph = Typography;

export const EditProfile = () => {

	const user = useSelector(state => state.user);


	const dispatch = useDispatch();
	const { Option } = Select;

	const phoneValidator = (rule, value) => {
		if (
			!value ||
			!value.length ||
			(/^\d+$/.test(value) && value.length === 10)
		) {
			return Promise.resolve();
		} else {
			return Promise.reject('Invalid US Phone Number!');
		}
	};


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
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
	};

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			username: user.username
		})
	})

	const onFinish = values => {
		let userProfile = { _id: user._id, ...values };
		let edit = editProfile(userProfile);
		let res = edit(dispatch);
	}

	const onFinishFailed = ({ errorfields }) => {
		form.scrollToField(errorfields);
	}


	return (
		<div>
			<Paragraph className='title-middle'>
				<h3>Edit Profile</h3>
			</Paragraph>
			< Form
				{...formItemLayout}
				form={form}
				name="editProfile"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					name='username'
					label='Username'
					rules={[
						{
							required: true,
							message: 'Please input your username'
						}
					]}
				>
					<Input
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder='Username'
					/>
				</Form.Item>
				<Form.Item
					name='firstName'
					label='First Name'
					rules={[
						{
							required: true,
							message: 'Please input your first name!'
						}
					]}
				>
					<Input
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder='First Name'
					/>
				</Form.Item>
				<Form.Item
					name='lastName'
					label='Last Name'
					rules={[
						{
							required: true,
							message: 'Please input your Last name!'
						}
					]}
				>
					<Input
						prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder='LastName'
					/>
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'The input is not valid E-mail!'
						},
						{
							required: true,
							message: 'Please input your E-mail!'
						}
					]}
				>
					<Input placeholder="Email" />
				</Form.Item>
				<Form.Item
					name='phone'
					label='US Phone Number'
					rules={[
						{
							validator: phoneValidator
						}
					]}
				>
					<Input type='String' placeholder='US Phone Number' />
				</Form.Item>
				<Form.Item {...tailFormItemLayout}>
					<Button type="primary" htmlType="submit">
						Register
        		</Button>
				</Form.Item>
			</Form >
		</div>
	)
};
