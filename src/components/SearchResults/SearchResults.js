import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export function SearchResults(props) {
  return (
    <>
     <Card style={{ width: '25rem', margin: 10 }}>
      <Card.Header>Search Results</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item disabled>Search to get started</ListGroup.Item>
        {/* <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Morbi leo risus</ListGroup.Item>
        <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
      </ListGroup>
    </Card>
    </>
  );
}
