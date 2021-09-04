import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
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

import LinearProgress from "@material-ui/core/LinearProgress";
//New adds
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
//import dummy from "../../dummyData/dummy.json";

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
    width: "100%",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),

      alignItems: "center",
      color: "white",
    },
  },
  inputs: {
    color: "white",
    /* backgroundColor: theme.palette.background.paper, */
  },
  floatingLabelFocusStyle: {
    color: "white",
  },
  formFileds: {
    margin: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

//const list = dummy;

export default function TodoList() {
  //Defining all in  states -> Hooks
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //The loading
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(3);

  //For the radios
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleButtonClicked = () => {
    const csrftoken = Cookies.get("csrftoken");
    // From this one
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    };
    var titleG = title;
    var descG = description;
    console.log("Title:", titleG);
    console.log("Description:", descG);
    let newTodo = {
      task_title: titleG,
      body_desc: descG,
      priority: selectedValue,
      task_completed: "False",
    };
    //Here send to some where else
    //192.168.1.6:8000/api/users/todos/2/
    axios
      .post("api/users/todos/2/", newTodo, { headers })
      .then((res) => {
        console.log("The response.... :", res.data);

        window.location.reload();
        //setTodos(res.data);
      })
      .catch((err) => {
        console.log("Los errores: ", err);
      });
  };

  //Delete buttom
  const deleteTodos = () => {
    const csrftoken = Cookies.get("csrftoken");
    // From this one
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    };

    console.log("Massaaaaa", checked);
    //let result = checked.map(a => a.id);

    let result = { ...checked.map((a) => a.id) };
    console.log("Los IDS: ....", result);

    axios
      .put("api/users/todos/2/", result, { headers })
      .then((res) => {
        console.log("The response.... :", res.data);

        window.location.reload();
        //setTodos(res.data);
      })
      .catch((err) => {
        console.log("Los errores: ", err);
      });
  };

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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(event.target.value);
  };

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(3);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });
  useEffect(() => {
    //setData(list);
    //192.168.1.6:8000/api/users/todos/2/
    axios
      .get("api/users/todos/2/")
      .then((res) => {
        //console.log("Empty? :", res.data);
        //setTodos(res.data);
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    const timer = setInterval(() => {
      progressRef.current();
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <List dense className={classes.root}>
        {isLoading && (
          <div>
            <p
              style={{
                fontFamily: "Roboto",
              }}
            >
              Im 🙉 calling to the jungle..{" "}
            </p>
            <LinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
            />
          </div>
        )}
        {!isLoading && (
          <div>
            <p
              style={{
                fontFamily: "Roboto",
              }}
            >
              Someone has been 🐒 around...
            </p>
          </div>
        )}

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
                <Checkbox
                  onChange={handleToggle(value)}
                  checked={checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>

      <div>
        <form className={classes.formFileds} noValidate autoComplete="off">
          <TextField
            style={{ width: "100%" }}
            floatingLabelFocusStyle={classes.floatingLabelFocusStyle}
            InputProps={{
              className: classes.inputs,
            }}
            id="filled-basic"
            label="Task"
            variant="filled"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <TextField
            style={{ width: "100%" }}
            floatingLabelFocusStyle={classes.floatingLabelFocusStyle}
            InputProps={{
              className: classes.inputs,
            }}
            id="outlined-multiline-static"
            label="Task description"
            multiline
            rows={2}
            defaultValue=" "
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />

          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: "80%",
                float: "left",
                padding: "20px",
              }}
            >
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

              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={deleteTodos}
                >
                  Mark as completed
                </Button>
              </div>
            </div>
            <div
              style={{
                width: "20%",
                float: "left",
                padding: "20px",
              }}
            >
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleButtonClicked.bind(this)}
              >
                <AddIcon />
              </Fab>
            </div>

            <p hidden></p>
          </div>
        </form>
      </div>
    </div>
  );
}
