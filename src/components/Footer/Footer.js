import React from 'react';
import './Footer.css'

class Footer extends React.Component {
  render() {
    return(
      <footer className="Footer">
        <span className="todo-count">2 Items Left</span>
        <ul className="filter">
          <li><a href="#/" className="selected">All</a></li>
          <li><a href="#/active">Active</a></li>
          <li><a href="#/completed">Completed</a></li>
        </ul>
        <div class="clear-completed">Clear completed</div>
      </footer>
    );
  }
}

export default Footer;
