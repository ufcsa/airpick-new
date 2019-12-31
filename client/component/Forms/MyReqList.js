import React from 'react';
import { Table, Button, Divider, Tag, Spin } from 'antd';
import moment from 'moment-timezone';

const { Column, ColumnGroup } = Table;

class MyReqList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  render() {
    if(this.props.data !== undefined) this.state.loading = false;

    const list = this.props.data.map((item) => (
      {
        key: item._id,
        date: moment(item.arrivalTime).tz('America/New_York').format('YY-MM-DD'),
        time: moment(item.arrivalTime).tz('America/New_York').format('HH:mm'),
        airport: item.airport,
      }
    ));
    console.log(list);
    return (
      <div>
        {this.state.loading ? <Spin size='large' style={{display:'flex', justifyContent:'center'}} /> : 
        <Table dataSource={list} loading={this.state.loading} pagination={false}>
          <Column title='Date' dataIndex='date' key='date' />
          <Column title='Time' dataIndex='time' key='time' />
          <Column title='Airport' dataIndex='airport' key='airport' />
        </Table>}
      </div>
    )
  }
}

export default MyReqList;