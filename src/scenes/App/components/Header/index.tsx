import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              StackDraw (logo here)
            </div>
          </div>

          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/main" className="navbar-item">
                Drawer
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <p className="control">
                  <a href="https://github.com/kvakil/stackdraw/" className="button is-info">
                    View on Github
                  </a>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
