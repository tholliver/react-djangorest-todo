import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
//New adds
//import Button from '@material-ui/core/Button';

import TodoList from './components/Todos/TodoList';


class App extends Component {
  state = {
    todos: []
  };
 
  render(){
    return (
      <div>
        <h1>Now showing an component...</h1>
        <TodoList />
      </div>
      
        );
        }
  
  }
  
export default App;
