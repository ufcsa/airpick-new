import React from 'react';
import { connect } from 'react-redux';
import { Typography, Divider } from 'antd';
import RequestCenter from '../../component/Forms/MyRequestCenter';
const { Title } = Typography;

@connect(state => state)
class MyRequest extends React.Component {
	onCollapse = collapsed => {
		this.setState({ collapsed });
	};

	render() {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					My Request Center
				</Title>
				<Divider />
				<RequestCenter></RequestCenter>
			</Typography>
		);
	}
}

export default MyRequest;
