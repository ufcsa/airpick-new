import React from 'react';
import { Table, Button, Spin, Tooltip, Steps, Icon } from 'antd';
import moment from 'moment-timezone';

const { Column } = Table;
const { Step } = Steps;

class MyReqList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    if(this.props.data !== undefined) this.setState({loading: false});
  }

  handleEdit = requestId => {
    console.log(requestId);
  }

  render() {
    const list = this.props.data.map((item) => (
      {
        key: item._id,
        date: moment(item.arrivalTime).tz('America/New_York').format('YYYY-MM-DD'),
        time: moment(item.arrivalTime).tz('America/New_York').format('HH:mm'),
        airport: item.airport,
        volunteer: item.volunteer,
        published: item.published
      }
    ));

    return (
      <div>
        {this.state.loading ? <Spin size='large' style={{display:'flex', justifyContent:'center'}} /> : 
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
                    <Button type='default' icon='edit' shape='circle' style={{marginRight: 10}} onClick={()=>this.handleEdit(record.key)}></Button>
                  </Tooltip>
                  
                  <Tooltip title='Delete'>
                    <Button type='danger' icon='delete' shape='circle'></Button>
                  </Tooltip>
                </div>
              )
            }}>
          </Column>
          <Column title='Status'
            key='status'
            render={(text, record) => {
              const status = record.volunteer ? 2 : record.published ? 1 : 0;
              if(status === 0) {
                return <Step status='wait' title='Waiting to publish..' icon={<Icon type="exclamation-circle" />}></Step>
              } else if(status === 1) {
                return <Step status='process' title='Looking for volunteers..' icon={<Icon type='loading' />}></Step>
              } else {
                return <Step status='finish' title='Found volunteer!' icon={<Icon type='smile-o' />}></Step>
              }
            }}>
          </Column>
        </Table>}
      </div>
    )
  }
}

export default MyReqList;