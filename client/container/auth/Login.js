import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form, Input, Typography, Button } from 'antd';
import { connect } from 'react-redux';
import { loadPickreq } from '../../redux/request.redux';
import { login } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;

@connect(
  state => state.user,
  { login, loadPickreq }
)

class LoginForm extends React.Component {
  formRef = React.createRef();

  onFinish = values => {
    this.props.login(values)
      .then(() => { this.props.loadPickreq(this.props.username) })
      .catch(err => console.error(err));
  }

  onFinishFailed = ({ errorFields }) => {
    // scroll to the error field
    this.formRef.current.scrollToField(errorFields[0].name);
  }

  render() {
    console.log(this.props)
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };

    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Paragraph className='title-middle'>
          <h3>
            Log in to AirPick
          </h3>
        </Paragraph>
        <Paragraph>
          <Form
            {...formItemLayout}
            ref={this.formRef}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            name='login'
          >
            <Form.Item
              name='input'
              label='Username or Email'
              rules={[
                {
                  required: true,
                  message: 'Please input your username or e-mail!',
                }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username or Email"
              />
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
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 8 },
              }}
            >
              <Button type="primary" htmlType='submit'>
                Log in
              </Button>
              &nbsp; Or <a href="/register">register now!</a>
            </Form.Item>
          </Form>
        </Paragraph>
      </div>
    );
  }
}

export default LoginForm;

