import React from 'react';
import { Typography, Divider } from 'antd';
import PickreqForm from '../../component/Forms/PickreqForm';
const { Title } = Typography;

class PickReq extends React.Component {
	render () {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					Add/Modify Your Pick-up Request
				</Title>

				<Divider />
				<PickreqForm></PickreqForm>
			</Typography>
		);
	}
}

export default PickReq;
