import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

const list = [
  {
    "id":1,
    "title":"Do something azam",
    "desc":"Massa bro says ..."
  },
  {
    "id":2,
    "title":"The ultimate task",
    "desc":"Massa bro says ..."
  },
  {
    "id":3,
    "title":"Da magic bro",
    "desc":"Massa bro says ..."
  },
  {
    "id":4,
    "title":"La masa task",
    "desc":"Massa bro says ..."
  },
]

class App extends Component {
  constructor(props){
    super(props);
    this.state = {list};
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
            {this.state.list.map(
              item => (
                <div key={item.id} >
                  <h1>{item.title}</h1>
                  <p>{item.desc}</p>
                </div>
              )
            )}
          </div>
        </header>
      </div>
    );
  }
  
}

export default App;
