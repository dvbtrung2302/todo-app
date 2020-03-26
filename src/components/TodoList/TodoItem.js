import React from 'react';
import './TodoItem.css';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
  }

  handleCompleteClicked = () => {
    this.props.markCompleted(this.props.item);
  }

  handleDestroyClicked = () => {
      this.props.removeItem(this.props.item);
  }

  handleItemDoubleClick = () => {
    this.setState({
      isEditing: true
    })
  }

  handleItemEdit = (item) => {
    return(event) => {
      const value = event.target.value;
      if (event.keyCode === 13) {
        if (value === '') {
          this.props.removeItem(item);
        } else {
          this.props.editItem(item, value);
        }
        this.setState({
          isEditing: false
        })
      }
    }
  }

  handleItemOnBlur = (item) => {
    return(event) => {
      const value = event.target.value;
      if (value === '') {
        this.props.removeItem(item);
      } else {
        this.props.editItem(item, value);
      }
      this.setState({
        isEditing: false
      }) 
    }
  }

  render() {
    console.log('Todo Item rendering...');
    const { item } = this.props;
    const { isEditing } = this.state;
    return(
      <li className="TodoItem">
        { 
          !isEditing &&
          <input 
            type="checkbox" 
            checked={item.isCompleted}
            onChange={this.handleCompleteClicked}
          />
        }
        {
          !this.state.isEditing ? 
          <label 
            className={item.isCompleted ? 'completed' : null}
            onDoubleClick={this.handleItemDoubleClick}  
          >
            {item.title}
          </label> :
          <input 
            type="text"
            className="edit"
            autoFocus
            onBlur={this.handleItemOnBlur(item)}
            onKeyUp={this.handleItemEdit(item)}
            defaultValue={item.title}
          />
        }
        {
          !isEditing &&
          <button 
            onClick={this.handleDestroyClicked}
          ></button>
        }
      </li>
    );
  }
}

export default TodoItem;
