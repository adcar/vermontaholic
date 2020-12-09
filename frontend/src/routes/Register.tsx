import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {ENDPOINT, FETCH_POST} from "../api";
import Snackbar from "@material-ui/core/Snackbar";
import {useHistory} from "react-router-dom";

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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function Register() {
  const history = useHistory();
  const classes = useStyles();
  const [passErr, setPassErr] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');


  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log("submitted");
    console.log(username);
    console.log(password);
    console.log(passwordConfirm);
    if (password !== passwordConfirm) {
      setPassErr(true);
      return; // We don't want to continue with this function if they entered non-dupe passwords.
    } else {
      setPassErr(false);
    }
    (async () => {
      const res = await fetch(ENDPOINT + "/register", {
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
        setSnackMsg("Successfully registered. Redirecting you to the login page...");
        await sleep(3000);
        history.push("/login");
      } else {
        setSnackOpen(true);
        setSnackMsg("That username is already taken. Please try again.");
      }
    })();

  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
        <Typography variant={"h5"} component={"h1"} color={"primary"} gutterBottom>Register</Typography>

        <form onSubmit={handleSubmit}>
          <TextField label="Username" fullWidth className={classes.text} value={username}
                     onChange={e => setUsername(e.target.value)} />
          <TextField label="Password" fullWidth type={"password"} className={classes.text} value={password}
                     onChange={e => setPassword(e.target.value)} error={passErr} helperText={passErr ? "Passwords don't match" : ""} />
          <TextField label="Confirm Password" fullWidth type={"password"} style={{marginBottom: 40}}
                     value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} error={passErr} helperText={passErr ? "Passwords don't match" : ""} />
          <Button type={"submit"} color={"primary"} variant={"contained"}>Submit</Button>

        </form>
      </Paper>
    </Container>
    </>
  );
}
export default Register;
