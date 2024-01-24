import React, { useState } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import "./App.css"; // Import the CSS module

function App() {
  const [searchResults, setSearchResults] = useState([
    // mock data for now
    { name: "name1", artist: "artist1", album: "album1", id: 1 },
    { name: "name2", artist: "artist2", album: "album2", id: 2 },
    { name: "name3", artist: "artist3", album: "album3", id: 3 }
  ]);
  const [playlist, setPlaylist] = useState({name: '', songs: []});

  const [searchText, setSearchText] = useState('');

  function handleSongAdd(song) {
    if(playlist.songs.includes(song)) {
      return;
    }
    setPlaylist({...playlist, songs: [...playlist.songs, song]});
  }

  function handleClearPlaylist() {
    setPlaylist({...playlist, songs: []});
  }

  function handleRemoveSong(song) {
    setPlaylist({...playlist, songs: playlist.songs.filter((s) => s.id !== song.id)})
    // setPlaylist(playlist.songs.filter((s) => s.id !== song.id));
  }

  function handleSavePlaylist() {
    alert(JSON.stringify(playlist));
    setPlaylist({name: '', songs: []})
  }

  function handleSearch() {
    alert(searchText); 
  }

  function handlePlaylistName(name) {
    setPlaylist({...playlist, name: name});
  }

  function handleSearchText(text) {
    setSearchText(text);
  }

  return (
    <>
      <SearchBar 
      textToSearch={handleSearchText} 
      searchAction={handleSearch}
      />
      <div className="content">
        <SearchResults 
        searchResults={searchResults}
        addSongToPlaylist={handleSongAdd} 
        />
        <Playlist 
        playlist={playlist} 
        clearPlaylist={handleClearPlaylist} 
        removeSong={handleRemoveSong} 
        savePlaylist={handleSavePlaylist} 
        playlistName={handlePlaylistName}
        />
      </div>
    </>
  );
}

export default App;
