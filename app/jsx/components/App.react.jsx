import React from 'react';
import {Header} from './Header.react.jsx';
import {Body} from './Body.react.jsx';
import {Footer} from './Footer.react.jsx';

export class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}
