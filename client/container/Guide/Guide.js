import React from 'react';
import { connect } from 'react-redux';
import { Typography, Divider } from 'antd';
const { Title } = Typography;

@connect(state => state)
class Guide extends React.Component {
	onCollapse = collapsed => {
		this.setState({ collapsed });
	};

	render () {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					Student Guide
				</Title>
				<Divider />
				<div>
					<embed src={require('../../img/airpick_guide.pdf')} width="100%" height="1000px" />
				</div>
			</Typography>
		);
	}
}
export default Guide;
