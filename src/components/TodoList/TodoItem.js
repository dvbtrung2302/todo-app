import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
  render() {
    return(
      <li className="TodoItem">
        <input type="checkbox"/>
        <label>Todo Item 1</label>
        <button></button>
      </li>
    );
  }
}

export default TodoItem;
