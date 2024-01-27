import React, { useEffect, useState } from "react";
import { ListGroup, Card, Button, FloatingLabel, Form } from "react-bootstrap";
import styles from "./Playlist.module.css";

export function Playlist(props) {
  const [loader, setLoader] = useState('');
  useEffect(() => {
    if (props.isLoading) {
      setLoader(<div className={styles.loader}></div>);
    } else {
      setLoader('');
    }
  }, [props.isLoading]);

  return (
    <>
      <Card style={{ width: "25rem", margin: 10 }}>
        <Card.Header>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <span>Playlist</span>
            {loader}
            <div style={{ marginLeft: "auto" }}>
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
          </div>
        </Card.Header>
        <ListGroup variant="flush">
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
                  {song.artists[0].name} | {song.album.name}
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
