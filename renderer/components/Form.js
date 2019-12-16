import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { StoreConsumer } from '../store/StoreProvider';

import Dropzone from './Dropzone';

const FormSection = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: solid 1px #c9c9c9;
`;

class RecordForm extends React.Component {
  getStoreOptions = () =>
    this.props.storeOptions.map(item => ({ text: item, value: item }));

  render() {
    const { form } = this.props;
    const purchasedDate = form.purchasedDate
      ? new Date(form.purchasedDate)
      : form.purchasedDate;

    if (!this.props.formVisible) {
      return <></>;
    }

    return (
      <>
        <FormSection>
          <Form size="big">
            <Form.Input
              name="name"
              label="Name"
              placeholder="Software name"
              value={form.name}
              onChange={this.props.handleFormChange}
            />
            <Form.Input
              name="web"
              label="Web"
              placeholder="Software web page"
              value={form.web}
              onChange={this.props.handleFormChange}
            />
            <Form.Group widths="equal">
              <Form.Dropdown
                name="store"
                label="Purchased at"
                placeholder="Store"
                options={this.getStoreOptions()}
                value={form.store}
                onChange={this.props.handleFormChange}
                selection
              />
              <SemanticDatepicker
                label="Purchased date"
                value={purchasedDate}
                onChange={this.props.handleDateChange}
                format="YYYY-MM-DD"
              />
            </Form.Group>
          </Form>
        </FormSection>
        <FormSection>
          <Form size="big">
            <Form.Input
              name="licensedTo"
              label="Licensed to"
              placeholder="Name, user, email"
              value={form.licensedTo}
              onChange={this.props.handleFormChange}
            />
            <Form.TextArea
              name="licenseKey"
              label="License key"
              placeholder="Paste your license key"
              rows="8"
              value={form.licenseKey}
              onChange={this.props.handleFormChange}
              style={{
                fontSize: '1rem',
                fontFamily: 'monospace',
              }}
            />
          </Form>
        </FormSection>
        <FormSection>
          <Dropzone />
        </FormSection>
      </>
    );
  }
}

RecordForm.propTypes = {
  form: PropTypes.object.isRequired,
  storeOptions: PropTypes.array.isRequired,
  activeRecord: PropTypes.string,
  formVisible: PropTypes.bool.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/display-name
export default props => (
  <StoreConsumer>
    {context => (
      <RecordForm
        {...props}
        form={context.state.form}
        storeOptions={context.state.storeOptions}
        activeRecord={context.state.activeRecord}
        formVisible={context.state.formVisible}
        handleFormChange={context.handleFormChange}
        handleDateChange={context.handleDateChange}
      />
    )}
  </StoreConsumer>
);
