import React from 'react';
import { Form, Input, DatePicker, TimePicker, Button } from 'antd';

class PickreqForm extends React.Component {
  // handle submit form info
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const rangeValue = fieldsValue['range-picker'];
      const rangeTimeValue = fieldsValue['range-time-picker'];
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
        'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
        'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        'range-time-picker': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
        'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
      };
      console.log('Received values of form: ', values);
      // TODO: add submit event to redux
      // TODO: Check if time is before today
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const requirement = {
      rules: [{
        type: 'object', required: true, message: 'Please select a time!'
      }],
    };

    
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='Date'>
          {getFieldDecorator('date', requirement)(<DatePicker />)}
        </Form.Item>
        <Form.Item label='Time'>
          {getFieldDecorator('time', requirement)(<TimePicker />)}
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPickreqForm = Form.create({ name: 'pick_time' })(PickreqForm)
export default WrappedPickreqForm