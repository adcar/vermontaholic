import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useAsyncEffect from "use-async-effect";
import TownButton from "../TownButton";
import {ENDPOINT} from "../api";
import {useParams} from "react-router-dom";

function Towns() {

  const [towns, setTowns] = useState([]);
  const {username} = useParams();
  const isAuthed = localStorage.getItem("username") === username;

  console.log("authed", isAuthed);

  useAsyncEffect(async () => {
    const res = await fetch(ENDPOINT + "/towns/" + username);

    const json = await res.json();

    setTowns(json);
  }, []);
  return (
    <Container>

      <Typography variant={"h2"} component={"h1"} style={{marginTop: 20}}>VT Towns</Typography>

      <div  style={{maxWidth: 400}}>
        {towns.map((town: any, index) => <TownButton key={index} town={town.name} isVisited={town.isVisited} username={username}/>)}
      </div>
    </Container>
  );
}

export default Towns;
