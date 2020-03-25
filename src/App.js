import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isTickAll: false,
      todoItems : [
        { title: 'Todo 1', isCompleted: true},
        { title: 'Todo 2', isCompleted: false}
      ]
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

  render() {
    const { todoItems, isTickAll } = this.state;  
    return (
      <div className="App">
        <Header 
          addItem={this.addItem}
        />
        <TodoList 
          todoItems={todoItems}
          markCompleted={this.markCompleted}
          removeItem={this.removeItem}
          markCompletedAll={this.markCompletedAll}
          isTickAll={isTickAll}
        />
        <Footer />
      </div>
    );
  }
}
export default App;
