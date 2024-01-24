import React from "react";
import {
  ListGroup,
  Card,
  Button,
  FloatingLabel,
  Form
} from "react-bootstrap";

export function Playlist(props) {
  return (
    <>
      <Card style={{ width: "25rem", margin: 10 }}>
        <Card.Header>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Playlist</span>
            <Button
              variant="secondary"
              size="sm"
              disabled={
                props.playlist.songs.length === 0 ||
                props.playlist.name.length === 0
              }
              onClick={() => props.savePlaylist()}
            >
              Save to spotify
            </Button>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          {/* <FormControl
            plaintext
            placeholder="Playlist Name"
            style={{ borderBottom: "1px solid #000", padding: 10 }}
            value={props.playlist.name}
            onChange={(e) => props.playlistName(e.target.value)}
          /> */}
          <FloatingLabel
            controlId="playlistName"
            label="Playlist Name"
            className="mb-3"
          >
            <Form.Control 
            type="text" 
            placeholder=""
            style={{ borderBottom: "1px solid #000", paddingLeft: 5 }}
            value={props.playlist.name}
            onChange={(e) => props.playlistName(e.target.value)} 
            />
          </FloatingLabel>
          {props.playlist.songs.length === 0 && (
            <ListGroup.Item disabled>Empty</ListGroup.Item>
          )}
          {props.playlist.songs.map((song) => {
            return (
              <ListGroup.Item
                key={song.id}
                onClick={() => props.removeSong(song)}
              >
                {song.name}
                <div style={{ fontSize: "0.8rem" }}>
                  {song.artist} | {song.album}
                </div>
              </ListGroup.Item>
            );
          })}
          {props.playlist.songs.length > 0 && (
            <ListGroup.Item>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={props.clearPlaylist}
                >
                  Clear playlist
                </Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
}
