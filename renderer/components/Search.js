import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Form, Icon } from 'semantic-ui-react';
import { StoreConsumer } from '../store/StoreProvider';

const SearchContainer = styled.div`
  padding: 10px;
  background-color: #3c8dbc;

  & .icon {
    position: absolute;
    top: 8px;
    left: 8px;
    color: rgba(192, 219, 235, 0.5) !important;
    z-index: 1;
  }

  & input {
    padding-left: 28px !important;
    background-color: #32769d !important;
    color: #c0dbeb !important;
  }

  & input:focus {
    border-color: transparent !important;
  }

  & input::placeholder {
    color: rgba(192, 219, 235, 0.5) !important;
  }

  & input::selection {
    background-color: rgba(192, 219, 235, 0.5) !important;
    color: #333;
  }
`;

class Search extends React.Component {
  keyUpHandler = e => {
    this.props.searchRecords(e.target.value);
  };

  render() {
    return (
      <SearchContainer>
        <Form size="small">
          <Icon name="search" />
          <Form.Input fluid placeholder="Search" onKeyUp={this.keyUpHandler} />
        </Form>
      </SearchContainer>
    );
  }
}

Search.propTypes = {
  searchRecords: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/display-name
export default props => (
  <StoreConsumer>
    {context => <Search {...props} searchRecords={context.searchRecords} />}
  </StoreConsumer>
);
