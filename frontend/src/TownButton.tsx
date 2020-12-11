import React from "react";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Link}  from "react-router-dom";


function ListItemBtn(props: any) {
  return <ListItem button component={Link} {...props} />;
}

function TownButton({town, isVisited, username}: {town: string, isVisited: boolean, username: string }) {


  return (
    <ListItemBtn to={`/town/${town}/${username}/${isVisited}`} style={{
      backgroundColor: isVisited ? deepPurple[500] : "transparent",
      color: isVisited ? "white" : "black",
      marginTop: 10,
      marginBottom: 10
  }}>
    <ListItemText primary={town} />

  </ListItemBtn>)

}


export default TownButton;
