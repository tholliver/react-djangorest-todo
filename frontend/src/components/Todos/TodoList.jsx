import React, { Component, useEffect, useState } from "react";
import axios from "axios";
// Styling
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { blueGrey, yellow, green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";

//New adds
//import Button from '@material-ui/core/Button';
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import dummy from "../../dummyData/dummy.json";

// Adds on

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: blueGrey[700],
    maxWidth: 360,
    textAlign: "center",
    color: "white",
    /* backgroundColor: theme.palette.background.paper, */
  },
  roots: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "33.6ch",
      color: "white",
    },
  },
  inputs: {
    color: "white",
    /* backgroundColor: theme.palette.background.paper, */
  },
}));

// Second styling

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const list = dummy;

export default function TodoList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  // Adds on for styling

  //For the radios
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setData(list);
    axios
      .get("api/")
      .then((res) => {
        console.log("Empty? :", res.data);
        //setTodos(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <List dense className={classes.root}>
        {isLoading && (
          <div>
            <p>Im 🙉 calling to the jungle.. </p>
          </div>
        )}
        <div>
          <p>Someone has been 🐒 around... </p>
        </div>
        {data.map((value) => {
          // const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value.id} button>
              <ListItemAvatar>
                <Icon style={{ color: yellow[500] }}>assignment_late</Icon>
              </ListItemAvatar>

              <ListItemText
                id={value.id}
                primary={value.task_title}
                secondary={value.body_desc}
              />

              <ListItemSecondaryAction>
                <Checkbox color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <div>
        <form className={classes.roots} noValidate autoComplete="off">
          <TextField
            InputProps={{
              className: classes.inputs,
            }}
            id="filled-basic"
            label="Task"
            variant="filled"
          />
          <br />
          <TextField
            InputProps={{
              className: classes.inputs,
            }}
            id="outlined-multiline-static"
            label="Task description"
            multiline
            rows={2}
            defaultValue=" "
            variant="outlined"
          />
        </form>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{
          width: "80%",
          float:"left",
          padding: "20px",
         
        }} >
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="radio-button-demo"
            inputProps={{ "aria-label": "A" }}
          />
          <Radio
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="radio-button-demo"
            inputProps={{ "aria-label": "B" }}
          />
          <GreenRadio
            checked={selectedValue === "c"}
            onChange={handleChange}
            value="c"
            name="radio-button-demo"
            inputProps={{ "aria-label": "C" }}
          />
          <Radio
            checked={selectedValue === "d"}
            onChange={handleChange}
            value="d"
            color="default"
            name="radio-button-demo"
            inputProps={{ "aria-label": "D" }}
          />
         
        </div>

        <div style={{
          width: "20%",
          float: "left",
          padding: "20px",
        }} >
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
}
