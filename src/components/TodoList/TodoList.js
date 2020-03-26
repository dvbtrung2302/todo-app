import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  render() {
    console.log('Todo list rendering...');
    const { 
      todoItems, 
      markCompleted, 
      removeItem, 
      isTickAll,
      length,
      editItem,
      markCompletedAll
    } = this.props;
    return (
      <ul className="TodoList">
        <input 
          type="checkbox"
          className={
            !length ? 'display-none' : null
          }
          checked={isTickAll}
          onChange={() => {markCompletedAll()}}
        />
        {
          todoItems.map((item, index) => 
          <TodoItem 
            key={index}
            item={item} 
            markCompleted={markCompleted}
            removeItem={removeItem}
            editItem={editItem}
          />)
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  todoItems: PropTypes.array, 
  markCompleted: PropTypes.func, 
  removeItem: PropTypes.func, 
  isTickAll: PropTypes.bool,
  length: PropTypes.number,
  editItem: PropTypes.func
}

export default TodoList;
