import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FloatingLabel, Button } from "react-bootstrap";
import styles from "./Searchbar.module.css"; // Import the CSS module

export function SearchBar(props) {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className={`justify-content-start navbar-custom ${styles.logo}`}
    >
      <div className={styles.navbarContainer}>
        <div className={styles.brandSearchContainer}>
          <Navbar.Brand href="#home" className={styles.logo}>
            Spotify Playlist Builder
          </Navbar.Brand>
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
              >
                Search
              </Button>
            </Form.Group>
          </Form>
        </div>
        <Button
          className={styles.button}
          variant="secondary"
          onClick={props.connectToSpotifyAction}
        >
          Connect to Spotify
        </Button>
      </div>
    </Navbar>
  );
}
