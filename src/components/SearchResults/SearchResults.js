import React, { useEffect, useState } from "react";
import { ListGroup, Card } from "react-bootstrap";
import styles from './SearchResults.module.css';

export function SearchResults(props) {

  const [loader, setLoader] = useState('');
  useEffect(() => {
    if(props.isLoading) {
      setLoader(<div className={styles.loader}></div>)
    } else {
      setLoader('');
    }
  }, [props.isLoading]);
  
  
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
        <Card.Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            Search Results
            {loader}
          </div>
        </Card.Header>
        <ListGroup variant="flush">{content}</ListGroup>
      </Card>
    </>
  );
}