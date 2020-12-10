import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {ENDPOINT, FETCH_POST} from "../api";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),

  },
  paper: {
    maxWidth: 300,
    padding: theme.spacing(3)
  },
  text: {
    marginBottom: 20
  }
}))

function Login({onLogin}: any) {
  const history = useHistory();

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    setSnackOpen(false);

    console.log("submitted");
    console.log(username);
    console.log(password);
    (async () => {
      const res = await fetch(ENDPOINT + "/login", {
        ...FETCH_POST,
        body: JSON.stringify({
          username,
          password
        })

      });

      const json = await res.json();
      console.log(json);
      if (json.status === "success") {
        localStorage.setItem('username', json.username);
        setSnackOpen(true);
        setSnackMsg("Successfully logged in. Redirecting...");
        onLogin();
        history.push("/towns/" + json.username);
      } else {
        setSnackOpen(true);
        setSnackMsg("Username or password incorrect. Please try again.");
      }

    })();
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');


  const classes = useStyles();
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        autoHideDuration={6000}
        message={snackMsg}

      />
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant={"h5"} component={"h1"} color={"primary"} gutterBottom>Login</Typography>

        <form onSubmit={handleSubmit}>
          <TextField required label="Username" fullWidth className={classes.text} value={username} onChange={e => setUsername(e.target.value)} />
          <TextField required label="Password" type={"password"} fullWidth style={{marginBottom: 40}} value={password} onChange={e => setPassword(e.target.value)}/>
          <Button type={"submit"} color={"primary"} variant={"contained"}>Submit</Button>
        </form>
      </Paper>
    </Container>
      </>
  );
}
export default Login;
