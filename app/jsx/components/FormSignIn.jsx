import React from 'react';

var ReactPropTypes = React.PropTypes;

export const FormSignIn = React.createClass({

  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    onSubmit: ReactPropTypes.func.isRequired,
    username: ReactPropTypes.string
  },

  getInitialState() {
    return {
      username: ''
    };
  },

  _onChange(event) {
    this.setState({
      username: event.target.value
    });
  },

  _onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
    this.setState({
      username: ''
    });
  },

  render() {
    return (
      <form className="form-signin" role="form" onSubmit={this._onSubmit}>
        <h2 className="form-signin-heading">{this.props.title}</h2>
        <p>
          <label htmlFor="username">Please enter your twitter username:</label>
        </p>
        <input
          required autofocus
          type="text"
          className="form-control"
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.state.username}
          onChange={this._onChange} />
        <div className="checkbox">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
});
