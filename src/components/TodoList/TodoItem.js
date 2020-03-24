import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {

  handleCompleteClicked = () => {
    this.props.markCompleted(this.props.item);
  }

  handleDestroyClicked = () => {
      this.props.removeItem(this.props.item);
  }

  render() {
    const { item } = this.props;
    return(
      <li className="TodoItem">
        <input 
          type="checkbox" 
          checked={item.isCompleted}
          onChange={this.handleCompleteClicked}
        />
        <label 
          className={item.isCompleted ? 'completed' : null}
        >
          {item.title}
        </label>
        <button 
          onClick={this.handleDestroyClicked}
        ></button>
      </li>
    );
  }
}

export default TodoItem;
