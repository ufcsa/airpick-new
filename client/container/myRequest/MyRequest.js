import React from 'react';
import { connect } from 'react-redux';
import { Typography, Divider } from 'antd';
import { loadPickreq } from '../../redux/request.redux';
import RequestCenter from '../../component/Forms/RequestCenter'
const { Title } = Typography;

@connect(
  state => state,
  { loadPickreq }
)
class MyRequest extends React.Component {
  constructor(props) {
    super(props);
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  render() {
    return (
      <Typography style={{ padding: '15px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          My Request Center
        </Title>
        <Divider />
        <RequestCenter></RequestCenter>
      </Typography>
    )
  }
}

export default MyRequest;