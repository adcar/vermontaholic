import React, {useState} from "react";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { Link}  from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ENDPOINT} from "./api";


function ListItemBtn(props: any) {
  return <ListItem button {...props} />;
}

function TownButton({town, isVisited, username, isAuthed}: {town: string, isVisited: boolean, username: string, isAuthed: boolean}) {

  const [visited, visit] = useState(isVisited);
  function handleClick() {
    visit(true);
    (async () => {
      const res = await fetch(ENDPOINT + "/" + username + "/visit/" + town);
      const json = await res.json();
      if (json.status !== "success") {
        //toast
      }

    })();
  }
  if (isAuthed && !visited) {
    return (
      <ListItemBtn  onClick={handleClick} style={{

        backgroundColor: visited ? deepPurple[500] : "transparent",
        color: visited ? "white" : "black",
        marginTop: 10,
        marginBottom: 10
      }}>
        <ListItemText primary={town} />
       <Button>Mark as visited</Button>

      </ListItemBtn>
    )
  } else {
    return (
      <ListItemBtn style={{

        backgroundColor: visited ? deepPurple[500] : "transparent",
        color: visited ? "white" : "black",
        marginTop: 10,
        marginBottom: 10
      }}>
        <ListItemText primary={town} />

      </ListItemBtn>
    )
  }

}


export default TownButton;
