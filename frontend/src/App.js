import "./App.css";
import React, { Component } from "react";
import axios from "axios";

import TodoList from "./components/Todos/TodoList";

class App extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div>
          <h1
            style={{
              color: "white",
            }}
          >
            Now showing an component...
          </h1>

          <h3
            style={{
              color: "white",
            }}
          >
            Gotta complete this ones:
          </h3>
          </div>
          
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TodoList />
        </div>
      </div>
    );
  }
}

export default App;
