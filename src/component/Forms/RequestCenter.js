/**
 *  List my request's status including volunteer info
*/

import React from 'react';
import { Modal, Button, Icon, Row, Col } from 'antd';
import PickForm from './PickModal';

class RequestCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      confirmLoading: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleSubmit = () => {
    
  }

  saveForm = () => {
    
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <Button type="primary" onClick={this.showModal}>
          <Icon type="plus" />Add Request
        </Button>
        <PickForm
          wrappedComponentRef={this.saveForm}
          visible={this.state.visible}
          onSubmit={this.handleSubmit}
          onCancel={this.handleCancel}>
        </PickForm>
      </div>
    )
  }
}

export default RequestCenter;