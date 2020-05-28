import React from 'react';
import { Typography, Divider, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AirAcceptedList } from '../../component/Volunteer/AirAcceptedList';
import { LodgeAcceptedList } from '../../component/Volunteer/LodgeAcceptedList';
import { loadAcceptedLodge } from '../../redux/lodge.redux';
import { loadAcceptedAirpick } from '@/redux/airpick.redux';

const { Title, Paragraph } = Typography;

const MyAccept = () => {
	// using useSelector hook to get user store from redux
	const userState = useSelector(state => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		if (userState.username) {
			dispatch(loadAcceptedAirpick(userState.username));
			dispatch(loadAcceptedLodge(userState.username));
		}
	}, [dispatch, userState.username]);



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
