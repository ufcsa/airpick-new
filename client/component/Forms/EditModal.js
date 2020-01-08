/**
 * This model is a modal that used to MODIFY selected request.
 */

import React from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, InputNumber } from 'antd';
import moment from 'moment-timezone';

const { TextArea } = Input;

class EditForm extends React.Component {

  render() {
    const { visible, onCancel, onSubmit, data } = this.props; // all these values are passed from its parent component 'MyReqList' 
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
        {data ?
          <Modal
            width={700}
            visible={visible}
            title="Update Pickup Request"
            okText='Update'
            onOk={onSubmit}
            onCancel={onCancel}>
            <Form {...formItemLayout}>
              {/* <Form.Item label='Publish'>
                {getFieldDecorator('publish')(<Switch autoFocus defaultChecked={data.published}></Switch>)}
              </Form.Item> */}
              <Form.Item label='Date'>
                {getFieldDecorator('date',
                  { ...requirement, initialValue: moment(data.arrivalTime).tz('America/New_York') }
                )(<DatePicker format={dateFormat} />)}
              </Form.Item>
              <Form.Item label='Time'>
                {getFieldDecorator('time',
                  { ...requirement, initialValue: moment(data.arrivalTime).tz('America/New_York') }
                )(<TimePicker format={timeFormat} />)}
              </Form.Item>
              <Form.Item label='Airport/Location'>
                {getFieldDecorator('airport',
                  { ...requirement, initialValue: data.airport }
                )(<Input placeholder='MCO' />)}
              </Form.Item>
              <Form.Item label='Number of Carry-ons'>
                {getFieldDecorator('carryon',
                  { ...requirement, initialValue: data.carryon }
                )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
              </Form.Item>
              <Form.Item label='Number of large luggages'>
                {getFieldDecorator('luggage',
                  { ...requirement, initialValue: data.luggage }
                )(<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
              </Form.Item>
              <Form.Item label='Notes'>
                {getFieldDecorator('notes',
                  { initialValue: data.notes }
                )(<TextArea placeholder='How many people coming with you?'></TextArea>)}
              </Form.Item>
            </Form>
          </Modal> : null}
      </div>
    );
  }
}

const WrappedEditForm = Form.create({ name: 'edit_form ' })(EditForm);
export default WrappedEditForm;