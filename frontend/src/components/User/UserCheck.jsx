import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Cookies from "js-cookie";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function TodoList() {
  const classes = useStyles();

  //Validation functions
  const [username, setUsername] = useState("");
  const [userNameTaken, setUserNameTaken] = useState("");
  const [errorTitulo, setErrorTitulo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsersData] = useState([]);

  useEffect(() => {
    //setData(list);
    //192.168.1.6:8000/api/users/todos/2/
    axios
      .get("/api/users/")
      .then((res) => {
        console.log("Empty? :", res.data);

        setUsersData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logIn = () => {
    const csrftoken = Cookies.get("csrftoken");
    // From this one
    const headers = {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    };
    //let result = checked.map(a => a.id);
    const user = {
      user_name: "mike",
    };
    axios
      .put("api/users/", user, { headers })
      .then((res) => {
        console.log("The response.... :", res.data);

        window.location.reload();
        //setTodos(res.data);
      })
      .catch((err) => {
        console.log("Los errores: ", err);
      });
  };
  let history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "10%",
          float: "left",
          padding: "20px",
          border: "2px solid red",
        }}
      >
        <img
          style={{
            borderRadius: "50em",
          }}
          src={
            "https://nationaltoday.com/wp-content/uploads/2020/12/Monkey.jpg"
          }
          width="300"
          height="300"
          alt="Logo"
        />
      </div>
      <div 
      style={{
        float: "left",
        padding: "20px",
        border: "2px solid red",
        
      }}>
        {isLoading ? (
          <div
            style={{
              
              border: "2px solid red",
              
            }}
          >
            <p
              style={{
                fontFamily: "Roboto",
                color: "white",
              }}
            >
              Just a moment{" "}
            </p>
            <div>
            <CircularProgress disableShrink />
            </div>
            
          </div>
        ) : (
          <div>
            <p
              style={{
                float: "left",
                fontFamily: "Roboto",
                color: "white",
               
              }}
            >
              You not have a user account!!!
            </p>
            <form className={classes.root} autoComplete="off">
              <div>
                <TextField
                  id="outlined-error-helper-text"
                  label="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (username.length === 0 || !username) {
                      setErrorTitulo(true);
                      setErrorTitulo("U must insert a username. To continue");
                    } else {
                      setErrorTitulo(false);
                    }
                  }}
                  error={errorTitulo}
                  helperText={"Insert a valid username"}
                  variant="outlined"
                />
              </div>
              <div>
                <Button variant="outlined" color="secondary">
                  Submit username
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
