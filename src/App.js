import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import AppContext from './contexts/AppContext';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    let data = JSON.parse(localStorage.getItem('data'));
    if (!data) {
      data = {
        todoItems: [],
        isTickAll: false
      }
    }
    data.todoItems = data.todoItems ? data.todoItems : [];
    this.state = {
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
    const { todoItems, isTickAll } = this.state;
    console.log('App rendering...');
    return (
      <AppContext.Provider value={{
        markCompleted: this.markCompleted,
        removeItem: this.removeItem,
        editItem: this.editItem
      }}>
        <Router>
          <div className="App">
            <div className="container">
              <div className="Main col-lg-6 mx-auto p-0">
                <Header 
                  addItem={this.addItem}
                />
                {
                  todoItems.length !== 0 ? 
                  <Switch>
                    <Route 
                      exact path='/' 
                      render={props => 
                        <div>
                          <TodoList 
                            todoItems={todoItems}
                            markCompletedAll={this.markCompletedAll}
                            isTickAll={isTickAll}
                            {...props}
                          />
                          <Footer 
                            todoItems={todoItems}  
                            clearCompletedItems={this.clearCompletedItems}
                            {...props}
                          />
                        </div> 
                      }/>
                    <Route 
                      path='/:status'
                      render={props => 
                        <div>
                          <TodoList 
                            todoItems={todoItems}
                            markCompletedAll={this.markCompletedAll}
                            isTickAll={isTickAll}
                            {...props}
                          />
                          <Footer 
                            todoItems={todoItems}  
                            clearCompletedItems={this.clearCompletedItems}
                            {...props}
                          />
                        </div> 
                      }
                    />                  
                  </Switch>
                  : null
                }
              </div>
            </div>/
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
}

// function RenderByStatus(props) {
//   const { status } = useParams();
//   return(
//   <div>Test {status}</div>
//   )
// }

export default App;