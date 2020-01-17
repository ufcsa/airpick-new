import React from 'react';
import { Typography, Divider } from 'antd';
import { connect } from 'react-redux';
import AcceptedList from '../../component/Volunteer/AcceptedList'

const { Title, Paragraph } = Typography;

@connect(
  state => state.user
)
class MyAccept extends React.Component {
  render() {
    return (
      <Typography style={{ padding: '15px' }}>
        <Title level={3} style={{ textAlign: 'center' }}>
          Accepted Requests
        </Title>
        {this.props.username ?
          (<div>
            <Paragraph style={{ margin: '15px', fontSize: 14 }}>
              Thank you for being a volunteer, {this.props.firstName}!
              <br></br>
              Here is the list of requests you accepted. We strongly suggest adding the new student as a WeChat friend to communicate about any possible changes.
            </Paragraph>
            <Divider></Divider>
            <AcceptedList></AcceptedList>
          </div>) : null
        }

      </Typography >
    )
  }
}

export default MyAccept;