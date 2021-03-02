import '../styles/globals.css';

import App from 'next/app';

export default class Site extends App {
  constructor(props) {
    super(props);
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
