import React, { Component } from "react";
import axios from "axios";
// Styling
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import { yellow } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

//New adds
//import Button from '@material-ui/core/Button';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Todo from "./Todo";
import dummy  from "../../dummyData/dummy.json";

// Adds on

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const list = dummy;


export default  class TodoList extends Component {
  state = {
    todos: [],
  };
  // Adds on for styling


  componentDidMount() {
    //this.getAllTodos();
   
    //Loading dummy data by now
    this.setState({ todos: list });
  }
  getAllTodos() { 
    axios
      .get("api/")
      .then((res) => {
        console.log("Empty? :", res.data);
        this.setState({todos: res.data});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Some todos ...</h2>
        <h3> Gotta complete this ones: </h3>
        <List dense >
          {this.state.todos.map((value) => {       
             
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem key={value.id} button>
              <Icon style={{ color: yellow[500] }}>assignment_late</Icon>
                
                <ListItemText id={labelId} primary={value.task_title} secondary={ value.body_desc} />
            
                <ListItemSecondaryAction>
                  <Checkbox
                   
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
       
      

        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
