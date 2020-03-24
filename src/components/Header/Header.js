import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="Header">
        <h1 className="title">todos</h1>
        <input type="text" placeholder="What needs to be done?" />
      </header>
    );
  }
}

export default Header;