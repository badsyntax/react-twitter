import React from 'react';
import {FormSignIn} from './FormSignIn.jsx';

export const SignInPage = React.createClass({

  getDefaultProps() {
    return {
      title: 'Sign In'
    };
  },

  onFormSubmit(username) {
    alert('Submitted form username: ' + username)
  },

  render() {
    return (
      <FormSignIn title={this.props.title} onSubmit={this.onFormSubmit} />
    );
  }
});
