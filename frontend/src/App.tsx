import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route, Link, Redirect
} from "react-router-dom";
import Towns from "./routes/Towns";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Home from "./routes/Home";
import Town from "./routes/Town";
import Register from "./routes/Register";
import Login from "./routes/Login";
import {ENDPOINT} from "./api";
import {useHistory} from "react-router-dom";

export default function App() {

  const username = localStorage.getItem("username");
  const [isLoggedIn, setIsLoggedIn] = useState(username !== null);
  function logout() {
    (async () => {
      const res = await fetch(ENDPOINT + "/logout");
      const json = await res.json();
      console.log(json);
      window.location.href = "http://vermontaholic.tk";
    })();
    localStorage.removeItem("username");
    setIsLoggedIn(localStorage.getItem("username") !== null);
  }
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Container>
          <Toolbar>
            <Typography variant="h6" style={{flex: 1, color: "white", textDecoration: "none"}} component={Link}  to={"/"}>
              Vermontaholic
            </Typography>
            {isLoggedIn ? <><Typography style={{marginRight: 20}}>{username}</Typography><Button color="inherit" onClick={logout}>Logout</Button></>: <Button color="inherit" component={Link} to={"/login"}>Login</Button>}

          </Toolbar>
          </Container>

        </AppBar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/towns/:username">
            <Towns />
          </Route>
          <Route path="/town/:town/:username/:isVisited">
            <Town />
          </Route>
          <Route path="/signup">
            <Register/>
          </Route>
          <Route path="/login">
            <Login onLogin={() => {
              setIsLoggedIn(localStorage.getItem("username") !== null);
            }}/>
          </Route>
          <Route path="/">
            {isLoggedIn ? <Redirect to={"towns/" + username} /> : <Home />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

