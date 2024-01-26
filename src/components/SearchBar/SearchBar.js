import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FloatingLabel, Button } from "react-bootstrap";
import styles from "./Searchbar.module.css"; // Import the CSS module

export function SearchBar(props) {
    var accessToken = false;
    var user = '';
    if(props.accessTokenState) { accessToken = true }
    if(props.user) {
      user = <div className={styles.smallText}>Spotify user: {props.user}</div>
    }

  return (
    <Navbar
      bg="light"
      expand="lg"
      className={`justify-content-start navbar-custom ${styles.logo}`}
    >
      <div className={styles.navbarContainer}>
        <div className={styles.brandSearchContainer}>
          <div>
          <Navbar.Brand href="#home" className={styles.logo}>
            Jammmin v2
          </Navbar.Brand><br />
          <span className={styles.smallText}>Spotify Playlist Builder</span>
          </div>
          <Form inline className={`my-2 my-lg-0 ${styles.formCustom}`}>
            <Form.Group controlId="formSearch" className="d-flex">
              <FloatingLabel
                controlId="floatingInput"
                label="Search for music"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={props.searchText}
                  onChange={(e) => props.textToSearch(e.target.value)}
                />
              </FloatingLabel>
              <Button
                variant="primary"
                className={styles.button}
                onClick={props.searchAction}
                disabled={!accessToken}
              >
                Search
              </Button>
            </Form.Group>
          </Form>
        </div>
        <div className={styles.buttonContainer}>
        <Button
          className={styles.button}
          variant="secondary"
          onClick={props.connectToSpotifyAction}
          disabled={accessToken}
        >
          Connect to Spotify
        </Button>
        {user}
        </div>
      </div>
    </Navbar>
  );
}
