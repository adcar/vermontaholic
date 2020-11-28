import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useAsyncEffect from "use-async-effect";
import TownButton from "../TownButton";

function Towns() {
  const [towns, setTowns] = useState([]);
  useAsyncEffect(async () => {
    // will be replaced with /towns
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    const json = await res.json();

    setTowns(json);
  }, []);
  return (
    <Container>
      <Typography variant={"h2"} component={"h1"} >VT Towns</Typography>
      {/*`..address.city` will be removed*/}
      {towns.map((town: any, index) => <TownButton key={index} town={town.address.city} isVisited={Math.random() < 0.2}/>)}
    </Container>
  );
}

export default Towns;
