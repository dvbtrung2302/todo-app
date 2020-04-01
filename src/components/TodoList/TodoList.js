import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

  filterByStatus = ( status = '') => {
    const { todoItems } = this.props;
    switch (status) {
      case 'active':
        return todoItems.filter(item => !item.isCompleted)
      case 'completed':
        return todoItems.filter(item => item.isCompleted)
      default:
        return todoItems
    }
  }

  render() {
    console.log('Todo list rendering...');
    const { 
      isTickAll,
      markCompletedAll,
      todoItems
    } = this.props;
    const status = this.props.match.params.status;
    return (
      <ul className="TodoList">
        <input 
          type="checkbox"
          className={
            !todoItems.length ? 'display-none' : null
          }
          checked={isTickAll}
          onChange={() => {markCompletedAll()}}
        />
        {
          this.filterByStatus(status).map((item, index) => 
          <TodoItem 
            key={index}
            item={item} 
          />)
        }
      </ul>
    );
  }
}

TodoList.propTypes = {
  todoItems: PropTypes.array, 
  isTickAll: PropTypes.bool,
  length: PropTypes.number,
}

export default TodoList;
