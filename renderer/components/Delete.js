import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

const Delete = (props) =>
  <Modal
    basic
    size='tiny'
    open={props.modalOpen}
    onClose={props.handleClose}
  >
    <Modal.Content style={{ textAlign: 'center' }}>
      <h3>Are you sure you want to delete this record?</h3>
      <h3> This process cannot be undone.</h3>
    </Modal.Content>
    <Modal.Actions style={{ textAlign: 'center' }}>
      <Button
        basic
        inverted
        onClick={props.handleClose}
      >
        <Icon name='remove' /> Cancel
      </Button>
      <Button
        color='red'
        inverted
        onClick={props.handleDelete}
      >
        <Icon name='checkmark' /> Delete
      </Button>
    </Modal.Actions>
  </Modal>
;

Delete.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Delete;