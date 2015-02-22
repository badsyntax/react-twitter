import React from 'react';
import Router from 'react-router';

var { Link } = Router;

export const Header = React.createClass({
  mixins: [Router.State],

  getActiveClassName() {
    return Array.prototype.slice.call(arguments).some(function(routeName) {
      return this.isActive(routeName);
    }, this) ? 'active' : '';
  },

  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className={this.getActiveClassName('signin')}>
                <Link to="signin">Sign In</Link>
              </li>
              <li className={this.getActiveClassName('about')}>
                <Link to="about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});
