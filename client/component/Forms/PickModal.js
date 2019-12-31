import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, InputNumber,Button, Switch, Spin } from 'antd';
import { updatePickreq, loadPickreq } from '../../redux/request.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';
const { TextArea } = Input;

class PickreqForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    }
  }
  // handle submit form info
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'publish': fieldsValue['publish'] ? fieldsValue['publish'] : false,
        'notes': fieldsValue['notes'] ? fieldsValue['notes'] : '',
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
        'time': fieldsValue['time'].format('HH:mm'),
        'username': this.props.user.username,
        'volunteer': this.props.user.volunteer
      };
      // this.props.updatePickreq(values);
    });
  };

  render() {
    const { visible, onCancel, onSubmit, form } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'HH:mm';
    const requirement = {
      rules: [{
        required: true, message: 'Please fill this field!'
      }],
    };

    
    return (
      <div>
        <Modal
          width={700}
          visible={visible}
          title="Add New Pickup Request"
          onOk={onSubmit}
          onCancel={onCancel}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='Publish'>
              {getFieldDecorator('publish')(<Switch autoFocus></Switch>)}
            </Form.Item>
            <Form.Item label='Date'>
              {getFieldDecorator('date', {...requirement})
              (<DatePicker format={dateFormat} />)}
            </Form.Item>
            <Form.Item label='Time'>
              {getFieldDecorator('time', {...requirement})
              (<TimePicker format={timeFormat} />)}
            </Form.Item>
            <Form.Item label='Airport/Location'>
              {getFieldDecorator('airport', {...requirement})(<Input placeholder='MCO'/>)}
            </Form.Item>
            <Form.Item label='Number of Carry-ons'>
              {getFieldDecorator('carryon', {...requirement})
              (<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
            </Form.Item>
            <Form.Item label='Number of large luggages'>
              {getFieldDecorator('luggage', {...requirement})
              (<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
            </Form.Item>
            <Form.Item label='Notes'>
              {getFieldDecorator('notes')
              (<TextArea placeholder='How many people coming with you?'></TextArea>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedPickreqForm = Form.create({ name: 'pick_time' })(PickreqForm);
export default WrappedPickreqForm;