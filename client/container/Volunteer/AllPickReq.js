import React from 'react';
import { Typography, Divider, Tag } from 'antd';
import AirReqList from '../../component/Volunteer/AirReqList';
import LodgeReqList from '../../component/Volunteer/LodgeReqList';

const { Title, Paragraph } = Typography;

class AllPickReq extends React.Component {
	render () {
		return (
			<div>
				<Typography style={{ padding: '15px' }}>
					<Title level={3} style={{ textAlign: 'center' }}>
					Airport Pickup Requests
					</Title>

					<Paragraph style={{ textAlign: 'center' }}>
						<Tag color='red'>Note:</Tag>
					This page lists all the airport pick-up requests. To accept one,
					simply click the &apos;Accept&apos; button on the left of that request.
					</Paragraph>
					<Divider />
					<AirReqList></AirReqList>
				</Typography>

		
			</div>
		);
	}
}

export default AllPickReq;
