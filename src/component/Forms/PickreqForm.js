import React from 'react';
import { Form, Input, DatePicker, TimePicker, InputNumber,Button, Switch, Spin } from 'antd';
import { updatePickreq, loadPickreq } from '../../redux/request.redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment-timezone';
const { TextArea } = Input;

@connect(
  state => state,
  { updatePickreq, loadPickreq }
)
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
      this.props.updatePickreq(values);
      //console.log('Received values of form: ', values);
      // TODO: Check if time is before today
      // TODO: Convert time to NY Timezone
    });
  };

  render() {
    this.previousReq = null;
    if(!this.props.request.request) {
      this.props.loadPickreq(this.props.user.username);
    } else {
      this.previousReq = null;
      if(this.props.request.request.data.request) {
        this.previousReq = this.props.request.request.data.request;
      } else {
        this.previousReq = {
          published: false,
        }
      }
 
      this.state.loading = false;
    }

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 18 },
        sm: { span: 6 },
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
      this.state.loading ? <Spin size="large" style={{display:'flex', justifyContent:'center'}}></Spin> :
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='Publish'>
          {getFieldDecorator('publish')(<Switch autoFocus defaultChecked={this.previousReq.published}></Switch>)}
        </Form.Item>
        <Form.Item label='Date'>
          {getFieldDecorator('date', {...requirement, initialValue: moment(this.previousReq.arrivalTime).tz('America/New_York')})
          (<DatePicker format={dateFormat} />)}
        </Form.Item>
        <Form.Item label='Time'>
          {getFieldDecorator('time', {...requirement, initialValue: moment(this.previousReq.arrivalTime).tz('America/New_York')})
          (<TimePicker format={timeFormat} />)}
        </Form.Item>
        <Form.Item label='Airport/Location'>
          {getFieldDecorator('airport', {...requirement, initialValue: this.previousReq.airport})(<Input placeholder='MCO'/>)}
        </Form.Item>
        <Form.Item label='Number of Carry-ons'>
          {getFieldDecorator('carryon', {...requirement, initialValue: this.previousReq.carryon})
          (<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
        </Form.Item>
        <Form.Item label='Number of large luggages'>
          {getFieldDecorator('luggage', {...requirement, initialValue: this.previousReq.luggage})
          (<InputNumber min={0} max={10} placeholder={2}></InputNumber>)}
        </Form.Item>
        <Form.Item label='Notes'>
          {getFieldDecorator('notes', {initialValue: this.previousReq.notes})
          (<TextArea placeholder='How many people coming with you?'></TextArea>)}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type='primary' htmlType='submit'>
            Submit My Updates!
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedPickreqForm = Form.create({ name: 'pick_time' })(PickreqForm);
export default WrappedPickreqForm;