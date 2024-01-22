import React from "react";
import { ListGroup, Card, Button, FormControl } from "react-bootstrap";

export function Playlist(props) {
  return (
    <>
      <Card style={{ width: "25rem", margin: 10 }}>
        <Card.Header>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Playlist</span>
            <Button disabled variant="secondary" size="sm">
              Save to spotify
            </Button>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          <FormControl 
            plaintext
            placeholder="Playlist Name"
            style={{ borderBottom: "1px solid #000", padding: 10 }}
          />
          <ListGroup.Item disabled>Empty</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
}
