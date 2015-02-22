import React from 'react';
import Router from 'react-router';

import {Header} from './Header.jsx';
import {Body} from './Body.jsx';
import {Footer} from './Footer.jsx';

var { Route, DefaultRoute, RouteHandler, NotFoundRoute, Redirect, Link } = Router;

export const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <RouteHandler/>
        <Footer />
      </div>
    );
  }
});
