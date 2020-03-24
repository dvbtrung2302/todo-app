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

  markCompleted = (item = {}) => {
    const { todoItems } = this.state;
    let { isTickAll } = this.state;
    const isCompleted = item.isCompleted;
    const list = todoItems.map(value => {
      if (value === item) {
        return { ...value, isCompleted: !isCompleted};
      } else {
        return { ...value};
      }
    });
    const isAllCompleted = 
    list.find(item => !item.isCompleted) ? false : true;
    isTickAll = isAllCompleted ? true : false;
    this.setState({
      isTickAll: isTickAll,
      todoItems: list
    });
  }

  removeItem = (item = {}) => {
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        ...todoItems.slice(index + 1)
      ]
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
    let { isTickAll } = this.state;
    const isAllCompleted = 
    todoItems.find(item => !item.isCompleted) ? false : true;
    isTickAll = isAllCompleted ? false : true;
    console.log(isAllCompleted);
    this.setState({
      isTickAll: isTickAll,
      todoItems: todoItems.map(item => {
        return { ...item, isCompleted: isTickAll}
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
