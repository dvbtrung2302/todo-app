import React from 'react';
import './TodoItem.css';
import AppContext from '../../contexts/AppContext';
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

  handleItemEdit = (item, removeItem, editItem) => {
    return(event) => {
      const value = event.target.value;
      if (event.keyCode === 13) {
        if (value === '') {
          removeItem(item);
        } else {
          editItem(item, value);
        }
        this.setState({
          isEditing: false
        })
      }
    }
  }

  handleItemOnBlur = (item, removeItem, editItem) => {
    return(event) => {
      const value = event.target.value;
      if (value === '') {
        removeItem(item);
      } else {
        editItem(item, value);
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
    const { item } = this.props;
    const { isEditing } = this.state;
    return(
      <li className="TodoItem">
        { 
          !isEditing &&
          <AppContext.Consumer>
            {({ markCompleted }) => 
            <input 
              type="checkbox" 
              checked={item.isCompleted}
              onChange={() => {markCompleted(item)}}
            />
            } 
          </AppContext.Consumer>       
        }
        {
          !this.state.isEditing ? 
          <label 
            className={item.isCompleted ? 'completed' : null}
            onDoubleClick={this.handleItemDoubleClick}  
          >
            {item.title}
          </label> :
          <AppContext.Consumer>
            {({ removeItem, editItem }) => 
            <input 
              type="text"
              className="edit"
              autoFocus
              onBlur={this.handleItemOnBlur(item, removeItem, editItem)}
              onKeyUp={this.handleItemEdit(item, removeItem, editItem)}
              defaultValue={item.title}
            />}
          </AppContext.Consumer>
        }
        {
          !isEditing &&
          <AppContext.Consumer>
            {({ removeItem }) => 
            <button 
              onClick={() => {removeItem(item)}}
            ></button>}  
          </AppContext.Consumer>
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
