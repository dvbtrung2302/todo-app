import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if(nextState !== this.state) {
      return true;
    } 
    return false;
  }

  handleOnType = (event) =>  {
    if (event.keyCode === 13) {
      this.props.addItem(event.target.value);
      this.setState({
        text: ''
      })
    }
  }

  setText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  render() {
    console.log('Header rendering...');
    return (
      <header className="Header">
        <h1 className="title">todos</h1>
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={this.state.text}
          onKeyUp={this.handleOnType}
          onChange={this.setText}
          autoFocus
        />
      </header>
    );
  }
}

Header.propTypes = {
  addItem: PropTypes.func
}

export default Header;