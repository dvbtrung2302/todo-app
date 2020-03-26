import React from 'react';
import './Footer.css'

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBtns: [
        { 
          name: 'All', 
          href: '/#', 
          onClick: () => {props.setStatus('All')}
        },
        { 
          name: 'Active', 
          href: '/#/active',
          onClick: () => {props.setStatus('Active')}
        },
        { 
          name: 'Completed', 
          href: '/#/completed',
          onClick: () => {props.setStatus('Completed')}
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
    const { filterBtns } = this.state;
    const { status, clearCompletedItems, todoItems } = this.props;
    const itemsLeft = this.itemsLeft();
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
      </footer>
    );
  }
}

class FilterBtn extends React.Component {
  render() {
    const { btn, status } = this.props;
    return(
      <li className="filterBtn">
        <a 
          href={btn.href} 
          className={ status === btn.name ? 'selected' : null}
          onClick={btn.onClick}
        >
            {btn.name}
        </a>
      </li>
    );
  }
}

export default Footer;
