/**
 * This model is a modal that used to add NEW requests.
 */

import React from 'react';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Modal, Input, DatePicker, TimePicker, InputNumber } from 'antd';

const { TextArea } = Input;

class PickreqForm extends React.Component {

  render() {
    const { visible, onCancel, onSubmit } = this.props; // values/functions passed from its parent component 'RequestCenter'
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
            {/* <Form.Item label='Publish'>
              {getFieldDecorator('publish')(<Switch autoFocus></Switch>)}
            </Form.Item> */}
            <Form.Item label='Date'>
              {getFieldDecorator('date',
                { ...requirement }
              )(<DatePicker format={dateFormat} />)}
            </Form.Item>
            <Form.Item label='Time'>
              {getFieldDecorator('time',
                { ...requirement }
              )(<TimePicker format={timeFormat} />)}
            </Form.Item>
            <Form.Item label='Airport/Location'>
              {getFieldDecorator('airport', { ...requirement })(<Input placeholder='MCO' />)}
            </Form.Item>
            <Form.Item label='Number of Carry-ons'>
              {getFieldDecorator('carryon',
                { ...requirement }
              )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
            </Form.Item>
            <Form.Item label='Number of large luggages'>
              {getFieldDecorator('luggage',
                { ...requirement }
              )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
            </Form.Item>
            <Form.Item label='Notes'>
              {getFieldDecorator('notes')(<TextArea placeholder='How many people coming with you?'></TextArea>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedPickreqForm = Form.create({ name: 'pick_time' })(PickreqForm);
export default WrappedPickreqForm;