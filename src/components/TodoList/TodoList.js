import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
class TodoList extends React.Component {
  render() {
    return (
      <ul className="TodoList">
        <input type="checkbox" className="toggle-all" />
        <TodoItem />
        <TodoItem />
      </ul>
    );
  }
}

export default TodoList;
