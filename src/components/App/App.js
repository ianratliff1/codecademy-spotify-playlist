import React, { useState, useEffect } from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import "./App.css"; // Import the CSS module
import Spotify from "../../util/Spotify";

function App() {

  useEffect(() => {
    // Check if the access_token exists in the URL
    if (window.location.hash.includes('access_token')) {
      console.log('Spotify access token detected');
      const thisAccessToken = Spotify.parseAccessTokenFromUrl();
     setAccessToken(thisAccessToken);
     console.log(`Access token is: ${thisAccessToken.accessToken}`)
     // Get user info:
     fetch('https://api.spotify.com/v1/me', {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + thisAccessToken.accessToken
        },
      })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSpotifyUser(data);
      })
    }
  }, []);

  const [searchResults, setSearchResults] = useState(null);
  const [playlist, setPlaylist] = useState({name: '', songs: []});
  const [searchText, setSearchText] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [spotifyUser, setSpotifyUser] = useState({
    display_name: '',
    id: ''
  });


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
    console.log(`Saving playlist '${playlist.name}'`)
    fetch(`https://api.spotify.com/v1/users/${spotifyUser.id}/playlists`, {
      method: "POST",
      headers: {
        "authorization": "Bearer " + accessToken.accessToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": playlist.name,
        "description": "Created by Ian's Jammmin v2",
        "public": false
      })
    })
    .then((response) => response.json())
    .then((data) => {
      const tracksToSave = {
        "uris": playlist.songs.map(song => {
          return song.uri
        })
      };
      console.log(`tracksToSave: ${JSON.stringify(tracksToSave)}`)
      // data.id
      console.log(`New Playlist ID: ${data.id}`);
      fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
        method: "POST",
        headers: {
          "authorization": "Bearer " + accessToken.accessToken,
          // "Content-Type": "application/json"
        },
        body: JSON.stringify(tracksToSave)
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.snapshot_id) {
          alert('Playlist saved successfully');
          setPlaylist({name: '', songs: []})
        } else {
          alert('There was an error saving the playlist. Please try again later.');
        }
      })
    })
  }

  function handleSearch() {

    // alert(searchText); 
    const textToSearch = encodeURIComponent(searchText);
    const req = `https://api.spotify.com/v1/search?q=${textToSearch}&type=track&limit=10`
    console.log(`Search URI: ${req}`);
    // console.log('header|||  "authorization": "Bearer " '+ accessToken.accessToken);
    // console.log(JSON.stringify(accessToken))
    fetch(req, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + accessToken.accessToken
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Search results are in, here they are. Setting search Results!'+data);
        setSearchResults(data);

      })
      .catch((error) => console.log(error));
  }

  function handlePlaylistName(name) {
    setPlaylist({...playlist, name: name});
  }

  function handleSearchText(text) {
    setSearchText(text);
  }

  function handleConnectToSpotify() {
    Spotify.getAccessToken()
  }

  return (
    <>
      <SearchBar 
      textToSearch={handleSearchText} 
      searchAction={handleSearch}
      connectToSpotifyAction={handleConnectToSpotify}
      accessTokenState={accessToken}
      user={spotifyUser.display_name}
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
