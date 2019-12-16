import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';
import { StoreConsumer } from '../store/StoreProvider';

import helpers from '../lib/helpers';

const StyledContainer = styled.div`
  height: calc(100% - 55px);
  padding: 0 !important;
  overflow: auto;

  & .item {
    line-height: 24px !important;
    padding: 0.8rem 1rem !important;
  }

  & .item:last-child {
    border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  }

  & .item.active {
    padding-left: 0.6rem !important;
    border-left: solid 0.4rem #3c8dbc;
    background-color: #f7f7f7;
  }

  & .item:hover {
    background-color: #f7f7f7;
    cursor: pointer;
  }
`;

class Records extends React.Component {
  render() {
    const { records } = this.props;
    return (
      <StyledContainer>
        {!helpers.emptyObject(records) && (
          <List divided relaxed>
            {Object.keys(records).map((keyName, keyIndex) => (
              <List.Item
                key={keyIndex}
                content={records[keyName].name}
                active={records[keyName].id === this.props.activeRecord}
                onClick={() => {
                  this.props.setActiveRecord(records[keyName].id);
                }}
              />
            ))}
          </List>
        )}
      </StyledContainer>
    );
  }
}

Records.propTypes = {
  records: PropTypes.array.isRequired,
  activeRecord: PropTypes.string,
  setActiveRecord: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/display-name
export default props => (
  <StoreConsumer>
    {context => (
      <Records
        {...props}
        records={context.state.records}
        activeRecord={context.state.activeRecord}
        setActiveRecord={context.setActiveRecord}
      />
    )}
  </StoreConsumer>
);
