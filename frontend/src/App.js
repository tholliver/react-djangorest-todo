import "./App.css";
import React, { Component } from "react";
import UserCheck from "./components/User/UserCheck";
import TodoList from "./components/Todos/TodoList";


export default function App() {
  
  const checkUserIn = () => {
    return localStorage.getItem("usedis") === null ? false : true;
  };
  let userIn = checkUserIn();
  
  //Delete buttom
  
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
        
      </div>
      <div
        style={{
          
        }}
      >
        {userIn ? (
          <div>
            <TodoList />
          </div>
        ) : (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}>
            <UserCheck />
          </div>
        )}
      </div>
    </div>
  );
}
