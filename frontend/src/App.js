import './App.css';
import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  state = {
    todos: []
  };
  componentDidMount(){
    this.getAllTodos();
  }
  getAllTodos(){
    
    axios.get('api/?format=json').then(
      res => {
        console.log("Empty? :", res.data);
        this.setState({todos: res.data});
      }
    ).catch(err => {
       console.log(err);
    });
  }

  render(){
    return (
      <div>
        <h1>Some todos ...</h1>
        <h2>  Gotta complete this ones: </h2>
          <div>
        {this.state.todos.map(item => (
        <div key={item.id}>          
        <h4>{item.task_title}</h4>
        <span>{item.body_desc}</span>
        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        ))}
        </div>
      </div>
      
        );
        }
  
  }
  
export default App;
