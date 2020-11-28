import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Towns from "./routes/Towns";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Home from "./routes/Home";
import Town from "./routes/Town";

export default function App() {
  return (
    <Router>
      <div>
        <AppBar position="static">
          <Container>
          <Toolbar>
            <Typography variant="h6" style={{flex: 1}}>
              Vermontaholic
            </Typography>
            <Button color="inherit" >Login</Button>
          </Toolbar>
          </Container>

        </AppBar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/towns">
            <Towns />
          </Route>
          <Route path="/town/:town">
            <Town />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

