import { useEffect } from "react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";
import YourPlaylist from "./components/YourPlaylist";

function App() {
  // App states
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  // API settings
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "72e2ff330emsh2b72d0bf2140b79p1b6dc2jsn3ca50846d6ad",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  // Local storage (save state after reload)

  // Local storage: playlist
  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "CREATE_PLAYLIST_APP_PLAYLIST"
    );
    if (savedData != null) setPlaylist(JSON.parse(savedData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem(
      "CREATE_PLAYLIST_APP_PLAYLIST",
      JSON.stringify(playlist)
    );
  }, [playlist]);

  // Local storage: playlistName
  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "CREATE_PLAYLIST_APP_PLAYLIST_NAME"
    );
    if (savedData != null) setPlaylistName(JSON.parse(savedData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem(
      "CREATE_PLAYLIST_APP_PLAYLIST_NAME",
      JSON.stringify(playlistName)
    );
  }, [playlistName]);

  // fetch from API by searchTerm
  useEffect(() => {
    fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${searchTerm}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((err) => console.error(err));
    console.log(playlist);
  }, [searchTerm]);

  return (
    <div className="app">
      <div className="search">
        <h1>Playlist Creator</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SearchResult data={data} setPlaylist={setPlaylist} />
      </div>
      <div className="playlist">
        <div className="playlist-name">
          <input
            type="text"
            placeholder="Your's playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <Icon icon="ic:baseline-mode-edit" />
        </div>
        <YourPlaylist playlist={playlist} setPlaylist={setPlaylist} />
      </div>
    </div>
  );
}

export default App;
