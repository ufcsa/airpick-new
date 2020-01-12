/**
 * Showing volunteer info for my request, using react functional component
 */
import React from 'react';
import { Modal, List, Typography } from 'antd';

const VolunteerInfoModal = ({ visible, volunteerInfo, onCancel, onOk }) => {
  console.log(volunteerInfo);


  return (<div>
    {volunteerInfo ?
      <Modal
        width={450}
        visible={visible}
        title='Your Volunteer Information'
        onCancel={onCancel}
        onOk={onOk}
      >
        <List>
          <List.Item>
            <Typography.Text strong>Name</Typography.Text> {volunteerInfo.displayName}
          </List.Item>
        </List>
      </Modal> : null}
  </div>
  )
};

export default VolunteerInfoModal;