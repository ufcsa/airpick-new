import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Typography, Button, Radio, Row, Col, Tooltip } from 'antd';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;

const EMAIL_COOL_DOWN = 10;

@connect(state => state.user, { register })
class RegisterForm extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			confirmDirty: false,
			emailValid: false,
			codeResendLoading: false,
			codeResendCoolTime: EMAIL_COOL_DOWN
		};
		this.formRef = React.createRef();
	}

	handleEmailChange = (e) => {
		const email = e.target.value;
		if (/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/.test(email)) {
			this.setState({ emailValid: true });
		} else {
			this.setState({ emailValid: false });
		}
	}

	handleSendButton = () => {
		const email = this.formRef.current.getFieldValue('email');
		this.sendEmail(email);
		this.setState({ codeResendLoading: true });
		const interval = setInterval(() => {
			this.setState((state) => {
				if (state.codeResendCoolTime <= 0) {
					clearInterval(interval);
					return { codeResendLoading: false, codeResendCoolTime: EMAIL_COOL_DOWN };
				} else {
					return { codeResendCoolTime: state.codeResendCoolTime - 1 };
				}
			});
		}, 1000);
	}

	sendEmail = (email) => {
		console.log(email);
	}

	onFinish = values => {
		this.props.register(values);
	};

	onFinishFailed = ({ errorFields }) => {
		this.formRef.current.scrollToField(errorFields[0].name);
	};

	emailValidator = (rule, value) => {
		if (!value || /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/.test(value)) {
			return Promise.resolve();
		}
		return Promise.reject('Please enter a valid email address!');
	}

	phoneValidator = (rule, value) => {
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

	compareToFirstPassword = (rule, value) => {
		if (value && value !== this.formRef.current.getFieldValue('pwd')) {
			return Promise.reject('Two passwords that you enter is inconsistent!');
		} else {
			return Promise.resolve();
		}
	};

	render () {
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

		return (
			<div>
				{this.props.redirectTo ? (
					<Redirect to={this.props.redirectTo}></Redirect>
				) : null}
				<Paragraph className='title-middle'>
					<h3>Register</h3>
				</Paragraph>
				<Paragraph>
					<Form
						{...formItemLayout}
						ref={this.formRef}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						name='register'
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
								placeholder='Username or Email'
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
									message: 'Please input your last name!'
								}
							]}
						>
							<Input
								prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder='Last Name'
							/>
						</Form.Item>
						<Form.Item
							name='email'
							label='E-mail'
							rules={[
								{
									required: true,
									message: 'Please input your E-mail!'
								},
								{
									validator: this.emailValidator
								}
							]}
						>
							<Input onChange={this.handleEmailChange}/>
						</Form.Item>
						
						<Form.Item
							name='pwd'
							label='Password'
							rules={[
								{
									required: true,
									message: 'Please input your password!'
								}
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='confirm'
							label='Confirm Password'
							dependencies={['pwd']}
							rules={[
								{
									required: true,
									message: ''
								},
								{
									validator: this.compareToFirstPassword
								}
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name='gender'
							label='Gender'
							rules={[
								{
									required: true,
									message: 'Please choose your gender!'
								}
							]}
						>
							<Radio.Group>
								<Radio value='male'>Male</Radio>
								<Radio value='female'>Female</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item
							name='wechatId'
							label='Wechat ID'
							rules={[
								{
									required: true,
									message: 'Please input your wechat ID!'
								}
							]}
						>
							<Input placeholder='wechat' />
						</Form.Item>
						<Form.Item
							name='phone'
							label='US Phone Number'
							rules={[
								{
									validator: this.phoneValidator
								}
							]}
						>
							<Input type='String' placeholder='US Phone Number' />
						</Form.Item>
						<Form.Item label="Verify Email">
							<Row gutter={8}>
								<Col span={16}>
									<Form.Item
										name='code'
										noStyle						
										rules={[
											{
												required: true,
												message: 'Please input the email verification code you got!'
											}
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col span={6}>
									{this.state.emailValid ? (
										<Tooltip title='Click to get the verification code in your email'>
											<Button
												disabled={!this.state.emailValid || this.state.codeResendLoading}
												onClick={this.handleSendButton}
											>
												{this.state.codeResendLoading
													? this.state.codeResendCoolTime + 's'
													: 'Get Code'}
											</Button>
										</Tooltip>
									) : (
										<Tooltip title='Enter a valid email address and get a verification code'>
											<Button disabled={!this.state.emailValid} onClick={this.handleSendButton}>
										Get Code
											</Button>
										</Tooltip>
									)}
								</Col>
							</Row>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								xs: { span: 18, offset: 0 },
								sm: { span: 10, offset: 8 }
							}}
						>
							<Button type='primary' htmlType='submit'>
								Register
							</Button>
							&nbsp; Already have an account? <a href='/login'>Log in</a>
						</Form.Item>
					</Form>
				</Paragraph>
			</div>
		);
	}
}

export default RegisterForm;
