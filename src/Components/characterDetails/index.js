import React from "react";
import { Card } from "react-bootstrap";
const CharacterDetails = (data) => {
  return (
    <Card>
      {data ? (
        <>
          <Card.Img variant="top" src={data.data.image} />
          <Card.Body>
            <blockquote className=" blockquote mb-0">
              <p>name: {data.data.name}</p>
              <p>gender: {data.data.gender}</p>
              <p>species: {data.data.species}</p>
            </blockquote>
          </Card.Body>
        </>
      ) : (
        "Loading"
      )}
    </Card>
  );
};

export default CharacterDetails;
