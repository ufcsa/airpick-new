import React from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Table, Button, Spin, Tooltip, Steps } from 'antd';
import moment from 'moment-timezone';
import EditModal from './EditModal';
import { connect } from 'react-redux';
import { updatePickreq, deletePickreq } from '../../redux/request.redux';

const { Column } = Table;
const { Step } = Steps;

@connect(
  state => state,
  { updatePickreq, deletePickreq }
)
class MyReqList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      visible: false,
    };
  }

  componentDidMount() {
    if (this.props.data !== undefined) this.setState({ loading: false });
  }

  // open the modal
  handleEdit = request => {
    console.log(request);
    this.setState({ ...this.state, visible: true, data: request });
  }

  // delete the record
  handleDelete = request => {
    // call the function from redux
    this.props.deletePickreq(request);
  }

  handleSubmit = () => {
    console.log('submitting update');
    const { form } = this.formRef.props;

    form.validateFields((err, fieldsValue) => {
      if (err) {
        console.err(err.stack)
        return;
      }
      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'publish': true,
        'notes': fieldsValue['notes'] ? fieldsValue['notes'] : '',
        'date': fieldsValue['date'].format('YYYY-MM-DD'),
        'time': fieldsValue['time'].format('HH:mm'),
        'username': this.props.user.username,
        'volunteer': this.props.user.volunteer
      };

      this.props.updatePickreq(values).then(() => {
        this.setState({ visible: false });
      });
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  updateForm = formRef => {
    this.formRef = formRef;
  }

  render() {
    const list = this.props.data.map((item) => (
      {
        key: item._id,
        date: moment(item.arrivalTime).tz('America/New_York').format('YYYY-MM-DD'),
        time: moment(item.arrivalTime).tz('America/New_York').format('HH:mm'),
        arrivalTime: item.arrivalTime,
        airport: item.airport,
        volunteer: item.volunteer,
        published: item.published,
        carryon: item.carryon,
        luggage: item.luggage,
        notes: item.notes
      }
    ));

    return (
      <div>
        {this.state.loading ? <Spin size='large' style={{ display: 'flex', justifyContent: 'center' }} /> :
          <div>
            <Table dataSource={list} loading={this.state.loading} pagination={false}>
              <Column title='Date' dataIndex='date' key='date' />
              <Column title='Time' dataIndex='time' key='time' />
              <Column title='Airport' dataIndex='airport' key='airport' />
              <Column title='Action'
                key='action'
                render={(text, record) => {
                  return (
                    <div>
                      <Tooltip title='Edit'>
                        <Button type='default' icon={<EditOutlined />} shape='circle' style={{ marginRight: 10 }} onClick={() => this.handleEdit(record)}></Button>
                      </Tooltip>

                      <Tooltip title='Delete'>
                        <Button type='danger' icon={<DeleteOutlined />} shape='circle' onClick={() => this.handleDelete(record)}></Button>
                      </Tooltip>
                    </div>
                  );
                }}>
              </Column>
              <Column title='Status'
                key='status'
                render={(text, record) => {
                  const status = record.volunteer ? 2 : record.published ? 1 : 0;
                  if (status === 0) {
                    return <Step status='wait' title='Waiting to publish..' icon={<ExclamationCircleOutlined />}></Step>;
                  } else if (status === 1) {
                    return <Step status='process' title='Looking for volunteers..' icon={<LoadingOutlined />}></Step>;
                  } else {
                    return <Step status='finish' title='Found volunteer!' icon={<SmileOutlined />}></Step>;
                  }
                }}>
              </Column>
            </Table>
            <EditModal
              wrappedComponentRef={this.updateForm}
              visible={this.state.visible}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
              data={this.state.data}>
            </EditModal>
          </div>}
      </div>
    );
  }
}

export default MyReqList;