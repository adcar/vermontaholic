import envSvg from "../static/env.svg";
import React from "react";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(6),

  },
  art: {
    maxWidth: "100%"
  },
  cta: {
    marginTop: theme.spacing(2)
  }
}))

function Home() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
    <Grid container direction="row"
  justify="center"
  alignItems="center" spacing={4}>
      <Grid item md={6}>
        <Typography color={"primary"} variant={"h2"}>Vermontaholic</Typography>
        <Typography>Love exploring Vermont? Hate having to manually write down every town you visited?
          Then Vermontaholic is for you! With this web-based tool, you can keep track of which towns you visited,
          and share your beautiful photos of Vermont!
        </Typography>
        <div className={classes.cta}>
          <Button color={"primary"} variant={"contained"} disableElevation>Signup</Button>
          <Button color={"primary"} style={{marginLeft: 10}}>Login</Button>
        </div>
      </Grid>
      <Grid item md={6}>
        <img className={classes.art} alt={"Exploring Vermont"} src={envSvg} />
      </Grid>
    </Grid>
  </Container>
  );
}
export default Home;
