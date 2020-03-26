import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    let data = JSON.parse(localStorage.getItem('data'));
    if (data === null) {
      data = {
        status: 'All',
        isTickAll: true,
        todoItems: []
      }
    }
    this.state = {
      status: data.status,
      isTickAll: data.isTickAll,
      todoItems : data.todoItems
    }
  }

  componentDidUpdate(prevProps, nextState) {
    if (this.state !== nextState) {
      localStorage.setItem('data', JSON.stringify(this.state))
    }
  }
   
  checkIsTickAll = (list = []) => {
    if (list.find(item => !item.isCompleted)) {
      return false;
    }
    return true;
  }

  markCompleted = (item = {}) => {
    const { todoItems } = this.state;
    const isCompleted = item.isCompleted;
    const list = todoItems.map(value => {
      if (value === item) {
        return { ...value, isCompleted: !isCompleted};
      } else {
        return { ...value};
      }
    });
    const isAllCompleted = this.checkIsTickAll(list);
    this.setState({
      isTickAll: isAllCompleted,
      todoItems: list
    });
  }

  removeItem = (item = {}) => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);

    const list = [
      ...todoItems.slice(0, index),
      ...todoItems.slice(index + 1)
    ];

    const isAllCompleted = this.checkIsTickAll(list);

    this.setState({
      isTickAll: isAllCompleted,
      todoItems: list
    });
  }

  addItem = (text = '') => {
    const { todoItems } = this.state;
    text = text.trim();
    if (text === '') {
      return;
    }
    this.setState({
      isTickAll: false,
      todoItems: [
        ...todoItems,
        { title: text, isCompleted: false}
      ]
    })
  } 

  markCompletedAll = () => {
    const { todoItems } =  this.state;
    const isAllCompleted = this.checkIsTickAll(todoItems);
    this.setState({
      isTickAll: !isAllCompleted,
      todoItems: todoItems.map(item => {
        return { ...item, isCompleted: !isAllCompleted}
      })
    })
  }

  filterByStatus = ( status = '') => {
    const { todoItems } = this.state;
    switch (status) {
      case 'Active':
        return todoItems.filter(item => !item.isCompleted)
      case 'Completed':
        return todoItems.filter(item => item.isCompleted)
      default:
        return todoItems
    }
  }

  setStatus = (status = '') => {
    this.setState({
      status: status
    })
  }

  clearCompletedItems = () => {
    const { todoItems } = this.state;
    this.setState({
      todoItems: todoItems.filter(item => !item.isCompleted)
    });
  }

  editItem = (item = {}, text = '') => {
    const { todoItems } = this.state;
    text = text.trim();
    this.setState({
      todoItems: todoItems.map(value => {
        if (value === item) {
          return { ...value, title: text}
        } else {
          return { ...value};
        }
      })
    })
  }

  render() {
    const { todoItems, isTickAll, status } = this.state;
    console.log('App rendering...');
    return (
      <div className="App">
        <Header 
          addItem={this.addItem}
        />
        {
          todoItems.length !== 0 ? 
          <TodoList 
            length={todoItems.length}
            todoItems={this.filterByStatus(status)}
            markCompleted={this.markCompleted}
            removeItem={this.removeItem}
            markCompletedAll={this.markCompletedAll}
            isTickAll={isTickAll}
            status={status}
            editItem={this.editItem}
          /> : null
        }
        {
          todoItems.length !== 0 &&
          <Footer 
            todoItems={todoItems}  
            setStatus={this.setStatus}
            status={status}
            clearCompletedItems={this.clearCompletedItems}
          />
        }
      </div>
    );
  }
}
export default App;
