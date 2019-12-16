import React from 'react';
import App from 'next/app';
import { createGlobalStyle } from 'styled-components';
import StoreProvider from '../store/StoreProvider';

import '../../.semantic/dist/semantic.min.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const GlobalStyle = createGlobalStyle`
  #__next {
    height: 100vh;
    overflow: hidden;
  }
`;

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}

export default MyApp;
