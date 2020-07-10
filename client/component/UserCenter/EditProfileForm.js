import React from 'react';
import { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { editProfile } from '../../redux/user.redux';

export const EditProfileForm = () => {
	const user = useSelector(state => state.user);

	const dispatch = useDispatch();

	const phoneValidator = (rule, value) => {
		if (!value || !value.length || /^\d{10}$/.test(value)) {
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
				offset: 0
			},
			sm: {
				span: 16,
				offset: 8
			}
		}
	};

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phone: user.phone,
			username: user.username
		});
	}, [dispatch, form, user.email, user.firstName, user.lastName, user.phone, user.username]);

	const onFinish = values => {
		let userProfile = { _id: user._id, ...values };
		// console.log(editProfile(userProfile));
		dispatch(editProfile(userProfile));
	};

	const onFinishFailed = ({ errorfields }) => {
		form.scrollToField(errorfields);
	};

	return (
		<Form
			{...formItemLayout}
			form={form}
			name='editProfile'
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
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
				name='email'
				label='E-mail'
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
				<Input placeholder='Email' />
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
				<Button type='primary' htmlType='submit'>
					Update
				</Button>
			</Form.Item>
		</Form>
	);
};
