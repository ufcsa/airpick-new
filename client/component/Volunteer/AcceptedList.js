import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Row, Col, ConfigProvider } from 'antd';
import { loadAcceptedReq } from '@/redux/request.redux';
import { CancelModal } from './CancelModal';
import RenderEmpty from '@/component/Empty/CustomEmpty';
import moment from 'moment';

const { Column } = Table;

export const AcceptedList = () => {
	const fontStyle = { fontSize: 16 };
	const gutter = [0, 5];

	// hooks
	const [modalState, setModalState] = useState({
		visible: false
	});
	const [cancelModal, setCancelModal] = useState({
		visible: false
	});
	const userState = useSelector(state => state.user);
	const reqState = useSelector(state => state.request);
	const dispatch = useDispatch();
	useEffect(() => {
		if (userState.username) {
			dispatch(loadAcceptedReq(userState.username));
		}
	}, [dispatch, userState.username]);

	//functions to handle modal
	const handleOk = () => {
		setModalState({ ...modalState, visible: false });
	};

	const handleCancel = () => {
		setModalState({ ...modalState, visible: false });
	};

	const cancelReq = e => {
		console.log(e);
		setCancelModal({
			reqId: e.key,
			visible: true,
			volunteerId: userState.username
		});
	};
	// wait for loading
	if (reqState.acceptedList === undefined) {
		return null;
	}
	const acceptedList = reqState.acceptedList.map(v => ({
		...v,
		key: v.acceptedReq._id
	}));
	console.log(acceptedList);

	return (
		<div>
			<ConfigProvider renderEmpty={RenderEmpty}>
				<Table
					dataSource={acceptedList}
					loading={acceptedList ? false : true}
					pagination={false}
					tableLayout='fixed'
				>
					<Column
						title='Cancel'
						key='cancel'
						render={(text, record) => {
							return (
								<div>
									<Button
										type='danger'
										size='small'
										onClick={() => cancelReq(record)}
									>
										cancel
									</Button>
								</div>
							);
						}}
					></Column>
					<Column title='Name' dataIndex={['userInfo', 'firstName']}></Column>
					<Column
						title='Contact'
						key='contact'
						render={(text, record) => {
							return (
								<div>
									<Button
										type='primary'
										size='small'
										onClick={() =>
											setModalState({
												visible: true,
												userInfo: record.userInfo
											})
										}
									>
										Contact
									</Button>
								</div>
							);
						}}
					/>
					<Column
						title='Time'
						key='time'
						render={(text, record) => {
							return moment(record.acceptedReq.arrivalTime)
								.tz('America/New_York')
								.format('ddd, MMM Do YYYY HH:mm');
						}}
					></Column>
					<Column
						title='Airport/Address'
						dataIndex={['acceptedReq', 'airport']}
						key='airport'
					></Column>
					<Column
						title='Luggage'
						dataIndex={['acceptedReq', 'luggage']}
						key='luggage'
					></Column>
					<Column
						title='Carryon'
						dataIndex={['acceptedReq', 'carryon']}
						key='carryon'
					></Column>
					<Column
						title='Notes'
						dataIndex={['acceptedReq', 'notes']}
						key='notes'
					></Column>
				</Table>
			</ConfigProvider>

			<CancelModal
				visible={cancelModal.visible}
				reqId={cancelModal.reqId}
				volunteerId={cancelModal.volunteerId}
				changeVsb={vsb => setCancelModal({ ...cancelModal, visible: vsb })}
			></CancelModal>
			{modalState.userInfo ? (
				<Modal
					width={550}
					title={modalState.userInfo.firstName + '\'s Contact Information'}
					visible={modalState.visible}
					onOk={handleOk}
					onCancel={handleCancel}
				>
					<Row gutter={gutter}>
						<Col span={4} style={fontStyle}>
							Name
						</Col>
						<Col span={14} style={fontStyle} offset={4}>
							{modalState.userInfo.displayName}
						</Col>
					</Row>
					<Row gutter={gutter}>
						<Col span={4} style={fontStyle}>
							E-mail
						</Col>
						<Col span={14} style={fontStyle} offset={4}>
							{modalState.userInfo.email}
						</Col>
					</Row>
					<Row gutter={gutter}>
						<Col span={4} style={fontStyle}>
							Wechat
						</Col>
						<Col span={14} style={fontStyle} offset={4}>
							{modalState.userInfo.wechatId}
						</Col>
					</Row>
					<Row gutter={gutter}>
						<Col span={4} style={fontStyle}>
							US Phone
						</Col>
						<Col span={14} style={fontStyle} offset={4}>
							{modalState.userInfo.phone}
						</Col>
					</Row>
				</Modal>
			) : null}
		</div>
	);
};
