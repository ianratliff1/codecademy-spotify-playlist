import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import "./App.css"; // Import the CSS module

function App() {
  return (
    <>
      <SearchBar />
      <div className="content">
        <SearchResults />
        <Playlist />
      </div>
    </>
  );
}

export default App;