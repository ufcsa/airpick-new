import React from 'react';
import { Typography, Divider, Tag } from 'antd';
import ReqList from '../../component/Volunteer/ReqList';

const { Title, Paragraph } = Typography;

class AllPickReq extends React.Component {

  render() {
    return (
      <Typography style={{ padding: '15px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Airport Pickup Requests
        </Title>

        <Paragraph style={{ textAlign: 'center' }}>
          <Tag color='red'>Note:</Tag>
          This page lists all the airport pick-up requests. To accept one, simply click the 'Accept' button on the left of that request.
        </Paragraph>
        <Divider />
        <ReqList></ReqList>
      </Typography>
    )
  }
}

export default AllPickReq;