import React from 'react';
import { Form, Input, Icon, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;
@connect(
  state => state.user,
  { login }
)
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      pwd: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.login(this.state);
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 10 },
      },
    };

    return (
      <div>
        <Paragraph className='title-middle'>
          <h3>
            Log in to AirPick
          </h3>
        </Paragraph>
        <Paragraph>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='Username or Email'>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username or email!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username or Email"
                />,
              )}
            </Form.Item>
            <Form.Item label='Password'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 11 },
              }}
            >
              <Button type="primary" htmlType="submit">
                Log in
              </Button>
              &nbsp; Or <a href="/register">register now!</a>
            </Form.Item>   
          </Form>
        </Paragraph>
      </div>
    )
  }
}
const Login = Form.create({ name: 'normal_login' })(LoginForm);
export default Login;

