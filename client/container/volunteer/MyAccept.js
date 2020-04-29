import React from 'react';
import { Typography, Divider, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { AirAcceptedList } from '../../component/Volunteer/AirAcceptedList';
import {LodgeAcceptedList} from '../../component/Volunteer/LodgeAcceptedList';

const { Title, Paragraph } = Typography;

const MyAccept = props => {
	// using useSelector hook to get user store from redux
	const userState = useSelector(state => state.user);

	if (userState) {
		return (
			<Typography style={{ padding: '15px' }}>
				<Title level={3} style={{ textAlign: 'center' }}>
					Accepted Requests
				</Title>
				<Paragraph style={{ textAlign: 'center', fontSize: 14 }}>
					<Tag color='red'>Note:</Tag>
					Thank you for being a volunteer, {userState.firstName}!<br></br>
					Here is the list of requests you accepted. We strongly suggest adding
					the new student as a WeChat friend to communicate about any possible
					changes.
				</Paragraph>
				<Divider></Divider>
				<AirAcceptedList></AirAcceptedList>
				<br></br>
				<br></br>
				<LodgeAcceptedList></LodgeAcceptedList>
			</Typography>
		);
	} else {
		return null;
	}
};

export default MyAccept;
