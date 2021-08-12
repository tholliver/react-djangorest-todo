import React, { Component } from 'react';

export default class Todo extends Component {
    render(){
        const todosid = this.props.itemsid;
        const todotitle = this.props.itemtitle;
        const tododet = this.props.intemdet;
        return(
            <div className="todo-full" >    
                         
                <div key={todosid}>          
                <h4>{todotitle}</h4>
                <span>{tododet}</span>
            </div>    
            </div>
        )
    }
}