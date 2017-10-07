import * as React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <div className="navbar-item">
              StackDraw (logo here)
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
