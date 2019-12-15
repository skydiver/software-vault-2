import React from 'react';
import App from 'next/app';
import StoreProvider from '../store/StoreProvider';

import '../../.semantic/dist/semantic.min.css';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}

export default MyApp;
