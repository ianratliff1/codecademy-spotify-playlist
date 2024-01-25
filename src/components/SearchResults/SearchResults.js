import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export function SearchResults(props) {

  return (
    <>
      <Card style={{ width: "25rem", margin: 10 }}>
        <Card.Header>Search Results</Card.Header>
        <ListGroup variant="flush">
          {props.searchResults.length === 0 && (
            <ListGroup.Item disabled>Search to get started</ListGroup.Item>
          )}
          {props.searchResults.map((song) => {
            return (
              <ListGroup.Item
                key={song.id}
                onClick={() => props.addSongToPlaylist(song)}
              >
                {song.name}
                <div style={{ fontSize: "0.8rem" }}>
                  {song.artist} | {song.album}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
}
