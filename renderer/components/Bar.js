import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Grid, Icon } from 'semantic-ui-react';
import { StoreConsumer } from '../store/StoreProvider';

import Delete from './Delete';

import toasts from '../lib/toasts';

const BottomBar = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  height: 64px;
  margin: 0;
  padding: 0 !important;
  background-color: #f9fafc;
  border-top: solid 1px #c9c9c9;

  & .ui.grid {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  & #bar-sidebar {
    display: flex !important;
    align-items: center;
    border-right: solid 1px #c9c9c9;
  }
`;

class Bar extends React.Component {
  state = { modalOpen: false };

  saveForm = () => {
    toasts.recordSaved();
    this.props.saveRecord();
  };

  deleteConfirmation = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => this.setState({ modalOpen: false });

  handleDelete = () => {
    toasts.recordDeleted();
    this.props.deleteRecord();
    this.setState({ modalOpen: false });
  };

  render() {
    const { form } = this.props;
    const readyToSave = !(form.name !== '');
    return (
      <BottomBar>
        <Grid>
          <Grid.Column id="bar-sidebar" largeScreen={4}>
            <Button fluid basic icon="plus" onClick={this.props.clearForm} />
          </Grid.Column>
          <Grid.Column id="bar-main" largeScreen={12}>
            {this.props.formVisible && (
              <>
                <Button
                  basic
                  icon="trash alternate outline"
                  color="red"
                  onClick={this.deleteConfirmation}
                />
                <Button
                  disabled={readyToSave}
                  icon
                  primary
                  labelPosition="right"
                  floated="right"
                  onClick={this.saveForm}
                >
                  Save
                  <Icon name="save outline" />
                </Button>
                <Button basic floated="right" onClick={this.props.cancelForm}>
                  Cancel
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid>
        <Delete
          modalOpen={this.state.modalOpen}
          handleClose={this.handleClose}
          handleDelete={this.handleDelete}
        />
      </BottomBar>
    );
  }
}

Bar.propTypes = {
  form: PropTypes.object.isRequired,
  formVisible: PropTypes.bool.isRequired,
  clearForm: PropTypes.func.isRequired,
  saveRecord: PropTypes.func.isRequired,
  deleteRecord: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/display-name
export default props => (
  <StoreConsumer>
    {context => (
      <Bar
        {...props}
        form={context.state.form}
        formVisible={context.state.formVisible}
        clearForm={context.clearForm}
        saveRecord={context.saveRecord}
        deleteRecord={context.deleteRecord}
        cancelForm={context.cancelForm}
      />
    )}
  </StoreConsumer>
);
