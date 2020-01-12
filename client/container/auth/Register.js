import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import '@ant-design/compatible/assets/index.css';
import { Form, Input, Typography, Button, Radio } from 'antd';
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
const { Paragraph } = Typography;
@connect(
  state => state.user,
  { register }
)
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
    this.formRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.register(values);
      } else {
        console.log(err);
      }
    });
  };

  onFinish = values => {
    this.props.register(values);
  }

  onFinishFailed = ({ errorFields }) => {
    this.formRef.current.scrollToField(errorFields[0].name);
  }

  phoneValidator = (rule, value) => {
    if (!value || !value.length || (/^\d+$/.test(value) && value.length === 10)) {
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

  render() {
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
        {console.log(this.props.redirectTo ? 'yes' : 'no')}
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Paragraph className='title-middle'>
          <h3>
            Register
          </h3>
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
                placeholder="Username or Email"
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
                placeholder="First Name"
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
                placeholder="Last Name"
              />
            </Form.Item>
            <Form.Item
              name='email'
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid E-mail address'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='pwd'
              label="Password"
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
              label="Confirm Password"
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
              label="Gender"
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
              <Input
                placeholder="wechat"
              />
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
              <Input
                type='String'
                placeholder="US Phone Number"
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                xs: { span: 18, offset: 0 },
                sm: { span: 10, offset: 8 },
              }}
            >
              <Button type="primary" htmlType='submit'>
                Register
              </Button>
              &nbsp; Already have an account? <a href="/register">Log in</a>
            </Form.Item>

          </Form>
        </Paragraph>
      </div>
    );
  }
}

export default RegisterForm;