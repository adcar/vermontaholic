import React, {useState} from 'react';

import {useParams} from "react-router-dom";
import {Container, Typography} from "@material-ui/core";
import {ENDPOINT, FETCH_POST} from "../api";
import useAsyncEffect from "use-async-effect";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

function Town() {
  const {town, username, isVisited} = useParams();
  const [visited, visit] = useState(isVisited);
  const [summary, setSummary] = useState("");
  const [summaryText, setSummaryText] = useState("");
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
  useAsyncEffect(async () => {
    const res = await fetch(ENDPOINT + `/${town}/summary/${username}>`);
    const json = await res.json();
    console.log(json);
    if (json.Summary !== "None") {
      setSummary(json.Summary);
    }
  }, []);

  useAsyncEffect(async () => {
    const res = await fetch(ENDPOINT + `/${town}/summary/${username}>`);
    const json = await res.json();
    console.log(json);
    if (json.Summary !== "None") {
      setSummary(json.Summary);
    }
  }, []);

  function handleSummarySubmit(e: any) {
    e.preventDefault();
    (async () => {
      const res = await fetch(ENDPOINT + `/${town}/summary/${username}>`, {
        ...FETCH_POST,
        body: JSON.stringify({
          summary: summaryText
        })
      });
      const json = res.json();
      console.log(json);
      setSummary(summaryText);
    })();
  }

  return (
    <Container>

      <Typography variant={"h2"} component={"h1"} style={{marginTop: 20}}>{town} {visited ? <Chip label="Visited" color={"primary"} /> : <Button color={"primary"} onClick={handleClick}>Mark as Visited</Button>}</Typography>

      {summary === "" ? <Paper style={{marginTop: 20, maxWidth: 400, padding: 20}}>
        <form onSubmit={handleSummarySubmit} style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}>
          <TextField
            style={{
              marginBottom: 20
            }}
            label="Description"
            fullWidth
            multiline
            rowsMax={4}
            placeholder={`Write something about ${town}...`}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
          />
          <Button type={"submit"} variant={"contained"} color={"primary"}>Submit</Button>
        </form>
      </Paper> : <Typography variant={"body1"}>{summary}</Typography>}
    </Container>);
}

export default Town;
