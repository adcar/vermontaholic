import React from 'react';

import {useParams} from "react-router-dom";
import {Container, Typography} from "@material-ui/core";

function Town() {
  const {town} = useParams();
  return (
    <Container>
      <Typography variant={"h2"} component={"h1"}>{town}</Typography>
    </Container>);
}

export default Town;
