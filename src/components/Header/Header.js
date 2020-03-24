import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
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

export default Header;