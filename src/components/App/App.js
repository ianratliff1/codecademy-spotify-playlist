import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import "./App.css"; // Import the CSS module
import Spotify from "../../util/Spotify";

function App() {

  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Check if the access_token exists in the URL
    if (window.location.hash.includes('access_token')) {
      console.log('Spotify access token detected');
      const thisAccessToken = Spotify.parseAccessTokenFromUrl();
     setAccessToken(thisAccessToken);
    }
  }, []);

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

  function handleConnectToSpotify() {
    console.log(Spotify.getAccessToken());
  }

  return (
    <>
      <SearchBar 
      textToSearch={handleSearchText} 
      searchAction={handleSearch}
      connectToSpotifyAction={handleConnectToSpotify}
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
