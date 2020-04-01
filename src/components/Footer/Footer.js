import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';
import {
  Link
} from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBtns: [
        { 
          name: 'all', 
        },
        { 
          name: 'active'
        },
        { 
          name: 'completed'
        }
      ]
    }
  }

  itemsLeft = () => {
    const { todoItems } = this.props;
    const itemsLeft = todoItems.reduce((acc, item) => {
      if (!item.isCompleted) {
        acc += 1;
      }
      return acc;
    }, 0); 
    return itemsLeft;
  }

  render() {
    console.log('Footer rendering...');
    const { filterBtns } = this.state;
    const { clearCompletedItems, todoItems } = this.props;
    const itemsLeft = this.itemsLeft();
    let status = this.props.match.params.status;
    status = !status ? 'all' : status;
    return(
      <footer className="Footer">
        <span 
          className="todo-count"
        >
          {itemsLeft} {itemsLeft === 1 ? 'item' : 'items'} Left 
        </span>
        <ul className="filter">
          { 
            filterBtns.map((btn, index) => 
            <FilterBtn 
              key={index} 
              btn={btn}
              status={status}
            />)
          }
        </ul>
        {
          itemsLeft < todoItems.length &&
          <div 
            className="clear-completed"
            onClick={() => {clearCompletedItems()}}
          >
            Clear completed
          </div>
        }
        <div className="description">
          <p>Double-click to edit a todo (Only in desktop)</p>
        </div>
      </footer>
    );
  }
}

class FilterBtn extends React.Component {
  capitalize = (s = '') => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  render() {
    const { btn, status } = this.props;
    return(
      <li className="filterBtn">
        <Link 
          to={btn.name === 'all' ? `/`: `/${btn.name}`}
          className={ status === btn.name ? 'selected' : null}    
        > 
          {this.capitalize(btn.name)} 
        </Link>
      </li>
    );
  }
}

Footer.propTypes = {
  clearCompletedItems: PropTypes.func,
  todoItems: PropTypes.array
}
export default Footer;
