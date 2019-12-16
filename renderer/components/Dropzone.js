import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames/bind';
import Dropzone from 'react-dropzone';
import { Icon, Image } from 'semantic-ui-react';
import { StoreConsumer } from '../store/StoreProvider';

const StyledDropZone = styled.div`
  text-align: center;

  & .file-drop {
    padding: 10px;
    border: solid 2px transparent;
    outline: none;
  }

  & .file-drop.active {
    background-color: #f0f0f0;
    border: dashed 2px #ddd;
  }

  & .file-drop.rejected {
    background-color: rgba(255, 18, 43, 0.05);
    border: dashed 2px rgba(255, 18, 43, 0.5);
  }

  & .file-drop img {
    height: 67px !important;
  }

  & p {
    margin-top: 10px;
    font-size: 0.8rem;
    color: #777;
  }
`;

class DropZone extends React.Component {
  handleDrop = acceptedFiles => {
    if (acceptedFiles.length === 1) {
      const icon = base64Img.base64Sync(acceptedFiles[0].path);
      this.props.handleIconChange(icon);
    }
  };

  render() {
    return (
      <StyledDropZone>
        <Dropzone
          accept="image/jpeg, image/png"
          multiple={false}
          onDrop={this.handleDrop}
        >
          {({ getRootProps, isDragActive, isDragReject }) => {
            const classActive = isDragActive ? 'active' : '';
            const classRejected = isDragReject ? 'rejected' : '';
            const icon = isDragReject ? 'close' : 'image outline';
            const helpText = isDragReject
              ? 'Invalid icon'
              : 'Drag and drop icon here';
            return (
              <div
                className={classNames('file-drop', classActive, classRejected)}
                {...getRootProps()}
              >
                {this.props.form.icon && (
                  <Image src={this.props.form.icon} wrapped />
                )}
                {!this.props.form.icon && (
                  <div>
                    <Icon circular name={icon} size="large" />
                    <p>{helpText}</p>
                  </div>
                )}
              </div>
            );
          }}
        </Dropzone>
      </StyledDropZone>
    );
  }
}

// eslint-disable-next-line react/display-name
export default props => (
  <StoreConsumer>
    {context => (
      <DropZone
        {...props}
        form={context.state.form}
        handleIconChange={context.handleIconChange}
      />
    )}
  </StoreConsumer>
);
