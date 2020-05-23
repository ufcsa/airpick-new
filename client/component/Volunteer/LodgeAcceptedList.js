import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Row, Col, ConfigProvider } from 'antd';
import { loadAcceptedLodge} from '../../redux/lodge.redux';
import { CancelModal } from './CancelModal';
import RenderEmpty from '@/component/Empty/CustomEmpty';
import moment from 'moment';

const { Column } = Table;

export const LodgeAcceptedList = () => {
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
	const reqState = useSelector(state => state.lodge);
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (userState.username) {
	// 		dispatch(loadAcceptedLodge(userState.username));
	// 	}
	// }, [dispatch, userState.username]);

	//functions to handle modal
	const handleOk = e => {
		setModalState({ ...modalState, visible: false });
	};

	const handleCancel = e => {
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
					pagination={{ pageSize:5,hideOnSinglePage:true,showQuickJumper:true }}
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
						title="Pickup Location"
						key='pickupLocation'
						dataIndex={['acceptedReq', 'pickupLocation']}
					></Column>
					<Column
						title='Start Date'
						key = 'startDate'
						render={(text, record) => {
							return moment(record.acceptedReq.startDate)
								.tz('America/New_York')
								.format('ddd, MMM Do YYYY HH:mm');
						}}
					></Column>
					<Column
						title='Leave Date'
						key = 'leaveDate'
						render={(text, record) => {
							return moment(record.acceptedReq.leaveDate)
								.tz('America/New_York')
								.format('ddd, MMM Do YYYY HH:mm');
						}}
					></Column>
					<Column
						title='Notes'
						dataIndex={['acceptedReq', 'notes']}
						key='notes'
					></Column>
					<Column
						title='Created at'
						key = 'createdAt'
						render={(text, record) => {
							return moment(record.acceptedReq.createdAt)
								.tz('America/New_York')
								.format('ddd, MMM Do YYYY HH:mm');
						}}
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


