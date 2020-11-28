import React from 'react';

import {useParams} from "react-router-dom";

function Town() {
  const {town} = useParams();
  return <h1>{town}</h1>;
}

export default Town;
