import React from 'react';
import Router from 'react-router';

import {App} from './components/App.jsx';
import {HomePage} from './components/HomePage.jsx';
import {SignInPage} from './components/SignInPage.jsx';
import {AboutPage} from './components/AboutPage.jsx';
import {NotFoundPage} from './components/NotFoundPage.jsx';

var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect,
} = Router;

export const routes = (
  <Route handler={App} path="/" name="app">
    <DefaultRoute handler={SignInPage} />
    <Route name="about" handler={AboutPage} />
    <Route name="signin" handler={SignInPage} path="/sign-in" />
    <NotFoundRoute handler={SignInPage}/>
    <Redirect from="" to="signin" />
  </Route>
);
