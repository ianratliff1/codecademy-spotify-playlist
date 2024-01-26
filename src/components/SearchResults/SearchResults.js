import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export function SearchResults(props) {
  var content = <ListGroup.Item disabled>Search to get started</ListGroup.Item>;

  if (props.searchResults && props.searchResults.tracks) {
    content = props.searchResults.tracks.items.map((track) => {
      return (
        <ListGroup.Item
          key={track.id}
          onClick={() => props.addSongToPlaylist(track)}
        >
          {track.name}
          <div style={{ fontSize: "0.8rem" }}>
            {track.artists[0].name} | {track.album.name}
          </div>
        </ListGroup.Item>
      );
    });
  }

  return (
    <>
      <Card style={{ width: "25rem", margin: 10 }}>
        <Card.Header>Search Results</Card.Header>
        <ListGroup variant="flush">{content}</ListGroup>
      </Card>
    </>
  );
}

// track.id, .name, .artists[0].name, .album.name

// artist: thisObj.tracks.items[n].artists[0].name
// album: thisObj.tracks.items[n].album.name
// song: thisObj.tracks.items[n].name
// id: thisObj.tracks.items[n].id
