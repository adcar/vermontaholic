import React from "react";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Link}  from "react-router-dom";

function ListItemLink(props: any) {
  return <ListItem button component={Link} {...props} />;
}

function TownButton({town, isVisited}: {town: string, isVisited: boolean}) {
  return (
    <ListItemLink to={`/town/${town}`} style={{
      backgroundColor: isVisited ? deepPurple[500] : "transparent",
      color: isVisited ? "white" : "black",
      marginTop: 10,
      marginBottom: 10
    }}>
      <ListItemText primary={town} />
    </ListItemLink>
  )
}


export default TownButton;
