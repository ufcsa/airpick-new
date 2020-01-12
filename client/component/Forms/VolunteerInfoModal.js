/**
 * Showing volunteer info for my request, using react functional component
 */
import React from 'react';
import { Modal, Row, Col } from 'antd';

const VolunteerInfoModal = ({ visible, volunteerInfo, onCancel, onOk }) => {
  const fontStyle = { fontSize: 16 }
  const gutter = [0, 5];

  return (<div>
    {volunteerInfo ?
      <Modal
        width={450}
        visible={visible}
        title='Your Volunteer Information'
        onCancel={onCancel}
        onOk={onOk}
      >
        <Row gutter={gutter}>
          <Col span={6} style={fontStyle}>Name</Col>
          <Col span={6} style={fontStyle} offset={6}>{volunteerInfo.displayName}</Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={6} style={fontStyle}>E-mail</Col>
          <Col span={6} style={fontStyle} offset={6}>{volunteerInfo.email}</Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={6} style={fontStyle}>Wechat</Col>
          <Col span={6} style={fontStyle} offset={6}>{volunteerInfo.wechatId}</Col>
        </Row>
        <Row gutter={gutter}>
          <Col span={6} style={fontStyle}>US Phone</Col>
          <Col span={6} style={fontStyle} offset={6}>{volunteerInfo.phone}</Col>
        </Row>
      </Modal> : null}
  </div>
  )
};

export default VolunteerInfoModal;