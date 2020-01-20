import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
import { loadAcceptedReq } from '../../redux/request.redux';
import moment from 'moment';

const { Column } = Table;

export const AcceptedList = props => {
	const userState = useSelector(state => state.user);
	const reqState = useSelector(state => state.request);
	const dispatch = useDispatch();
	useEffect(() => {
		if (userState.username) {
			dispatch(loadAcceptedReq(userState.username));
		}
	}, [dispatch, userState.username]);

	console.log(reqState.acceptedList);

	if (reqState.acceptedList === undefined) {
		return null;
	}
	// TODO: iterate through reqState.acceptedList to get all accepted list

	return (
		<div>
			<Table
				dataSource={reqState.acceptedList}
				loading={reqState.acceptedList}
				pagination={false}
				tableLayout='fixed'
			>
				<Column title='Name' dataIndex={['username']} key='name' />
				<Column
					title='Time'
					key='time'
					render={(text, record) => {
						debugger;
						return moment(record.arrivalTime)
							.tz('America/New_York')
							.format('ddd, MMM Do YYYY HH:mm');
					}}
				></Column>
				<Column
					title='Airport/Address'
					dataIndex={['airport']}
					key='airport'
				></Column>
				<Column title='Luggage' dataIndex={['luggage']} key='luggage'></Column>
				<Column title='Carryon' dataIndex={['carryon']} key='carryon'></Column>
				<Column title='Notes' dataIndex={['notes']} key='notes'></Column>
			</Table>
		</div>
	);
};
