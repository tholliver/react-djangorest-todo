import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

const instance = axios.create({

  baseURL: "192.168.1.15:8000/api/"
});

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
        {this.state.todos.map(item => (
        <div key={item.id}>          
     
        <h1>{item.task_title}</h1>
        <span>{item.body_desc}</span>
        </div>
        ))}
        </div>
        );
        }
  
  }
  


export default App;
