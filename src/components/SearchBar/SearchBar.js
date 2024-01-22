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
                                <Form.Control type="text" placeholder="" />
                            </FloatingLabel>
                            <Button variant="primary" className={styles.button}>
                                Search
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
                <Button className={styles.button} variant="secondary">Connect to Spotify</Button>
            </div>
        </Navbar>
    );
}