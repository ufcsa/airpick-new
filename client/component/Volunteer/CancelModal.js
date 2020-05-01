// let volunteer confirm to cancel a request
import React from 'react';
import { Modal, message } from 'antd';
import { cancelRequest } from '../../redux/request.redux';
import { useDispatch } from 'react-redux';

export const CancelModal = ({ visible, reqId, changeVsb, volunteerId }) => {
	const dispatch = useDispatch();
	const onOk = () => {
		dispatch(cancelRequest(reqId, volunteerId)).then(() => {
			message.success('Cancel successfully', 1);
			console.log('ok');
		});
		changeVsb(false);
	};
	const onCancel = () => {
		changeVsb(false);
	};

	return (
		<div>
			{reqId ? (
				<Modal
					visible={visible}
					title='Confirm cancelling request'
					onOk={onOk}
					onCancel={onCancel}
				>
					<h3>Are you sure you want to cancel this request?</h3>
					The requester will be notified by email, but we strongly encourage you
					to notify the requester via wechat or phone.
				</Modal>
			) : null}
		</div>
	);
};
