import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { WarningTwoTone } from '@ant-design/icons';
import { deletePickreq } from '@/redux/airpick.redux';
import { deleteLodgereq } from '@/redux/lodge.redux';

/**
 * Control the delete modal which let user to confirm deleting
 * the selected requests. 
 * Work for both airpick request or lodging request
 *
 * @export
 * @param {{isAirpick:boolean, reqID:string, username:string, visible:string, closeModal:(() => void)}} { isAirpick, reqID, username, visible, closeModal }
 * @returns
 */
export default function DeleteModal ({ isAirpick, reqID, username, visible, closeModal }) {
	const dispatch = useDispatch();
	const onOk = function hanldeModalOk () {
		if (isAirpick) {
			dispatch(deletePickreq(reqID, username)).then(() => {
				// console.log(reqID, ' deleted');
			});
		} else {
			dispatch(deleteLodgereq(reqID, username)).then(() => {
				// console.log(reqID, ' deleted');
			});
		}
		closeModal();
	};
  
	const onCancel = function handleModalCancel () {
		closeModal();
	};
  
	return (
		<div>
			{reqID ? (
				<Modal
					visible={visible}
					title='Deleting request'
					onOk={onOk}
					onCancel={onCancel}
				>
					<p><WarningTwoTone /> Are you sure you want to delete this request? 
          This operation cannot be undo. Your request will be permanently deleted.</p>
				</Modal>
			) : null}
		</div>
	);
}