import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
class TodoList extends React.Component {
  handleToggleAllClicked = () => {
    this.props.markCompletedAll();
  }
  
  render() {
    const { 
      todoItems, 
      markCompleted, 
      removeItem, 
      isTickAll,
      length,
      editItem
    } = this.props;
    return (
      <ul className="TodoList">
        <input 
          type="checkbox"
          className={
            !length ? 'display-none' : null
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
            editItem={editItem}
          />)
        }
      </ul>
    );
  }
}

export default TodoList;
