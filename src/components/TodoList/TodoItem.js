import React from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    }
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

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item === nextProps.item && this.state.isEditing === nextState.isEditing) {
      return false;
    }
    return true;
  }

  render() {
    console.log('Todo Item rendering...');
    const { 
      item, 
      markCompleted, 
      removeItem 
    } = this.props;
    const { isEditing } = this.state;
    return(
      <li className="TodoItem">
        { 
          !isEditing &&
          <input 
            type="checkbox" 
            checked={item.isCompleted}
            onChange={() => {markCompleted(item)}}
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
            onClick={() => {removeItem(item)}}
          ></button>
        }
      </li>
    );
  }
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }),
  markCompleted: PropTypes.func,
  removeItem: PropTypes.func,
  editItem: PropTypes.func
}



export default TodoItem;
