import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
class TodoList extends React.Component {
  handleToggleAllClicked = () => {
    this.props.markCompletedAll();
  }
  
  render() {
    const { todoItems, markCompleted, removeItem, isTickAll } = this.props;
    return (
      <ul className="TodoList">
        <input 
          type="checkbox"
          className={
            !todoItems.length ? 'display-none' : null
          }
          checked={isTickAll}
          onChange={this.handleToggleAllClicked}
        />
        {
          todoItems.map((item, index) => 
          <TodoItem 
            key={index}
            item={item} 
            markCompleted={markCompleted}
            removeItem={removeItem}

          />)
        }
      </ul>
    );
  }
}

export default TodoList;
