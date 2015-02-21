import React from 'react';
import Router from 'react-router';

import {App} from './components/App.jsx';
import {Home} from './components/Home.jsx';
import {About} from './components/About.jsx';
import {NotFound} from './components/NotFound.jsx';

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect,
} = Router;

export const routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route name="about" handler={About} />
    <Route name="home" handler={Home} path="/" />
    <NotFoundRoute handler={NotFound}/>
  </Route>
);
