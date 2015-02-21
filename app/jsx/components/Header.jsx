import React from 'react';
import Router from 'react-router';

var { Link } = Router;

class _Header {
  render() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className={this.getActiveClassName('home')}>
                <Link to="home">Home</Link>
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

  getActiveClassName() {
    return Array.prototype.slice.call(arguments).some(function(routeName) {
      return this.isActive(routeName);
    }, this) ? 'active' : '';
  }
}

_Header.prototype.mixins = [Router.State];

export const Header = React.createClass(_Header.prototype);
