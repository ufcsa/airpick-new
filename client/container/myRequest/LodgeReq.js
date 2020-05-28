import React from 'react';
import { Typography, Divider } from 'antd';
import LodgereqForm from '../../component/Forms/LodgereqForm';
const { Title } = Typography;

class LodgeReq extends React.Component {
	render () {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					Add/Modify Your Lodging Request
				</Title>
				<Divider />
				<LodgereqForm></LodgereqForm>
			</Typography>
		);
	}
}

export default LodgeReq;
