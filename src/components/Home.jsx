// import components
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import YourPlaylist from "./YourPlaylist";
import options from "../utils/api";

function Home() {
  // App states
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [reload, setReload] = useState(0);

  // Local storage (save state after reload)

  // Local storage: searchTerm
  useEffect(() => {
    const savedData = window.localStorage.getItem(
      "CREATE_PLAYLIST_APP_SEARCH_TERM"
    );
    if (savedData != null) setSearchTerm(savedData);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("CREATE_PLAYLIST_APP_SEARCH_TERM", searchTerm);
  }, [searchTerm]);

  // Local storage: data
  useEffect(() => {
    const savedData = window.localStorage.getItem("CREATE_PLAYLIST_APP_DATA");
    if (data && "data" in data && data.data[0]) setData(savedData);
  }, []);
  useEffect(() => {
    window.localStorage.setItem("CREATE_PLAYLIST_APP_DATA", data);
  }, [data]);

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
    fetch(`${options.url}/search?q=${searchTerm}`, options)
      .then((response) => response.json())
      .then((response) => setData(response));
  }, [searchTerm, reload]);

  useEffect(() => {
    if (!data?.data && searchTerm)
      setTimeout(() => {
        setReload(reload + 1);
      }, 5000);
  }, [data]);

  // declare handlers
  const handleOnChange = (e) => setPlaylistName(e.target.value);
  const handleSetSearchTerm = (searchTerm) => setSearchTerm(searchTerm);
  const handleSetPlaylist = (playlist) => setPlaylist(playlist);

  return (
    <div className="app">
      <div className="search">
        <h1>
          Playlist Creator
          <Icon
            icon="ion:reload-circle-sharp"
            className="icon"
            onClick={() => setReload(reload + 1)}
            id="reload"
          />
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={handleSetSearchTerm}
        />
        <SearchResult
          data={data}
          playlist={playlist}
          setPlaylist={handleSetPlaylist}
          searchTerm={searchTerm}
        />
      </div>
      <div className="playlist">
        <div className="playlist-name">
          <input
            type="text"
            placeholder="Name this playlist"
            value={playlistName}
            onChange={handleOnChange}
          />
          <Icon icon="ic:baseline-mode-edit" />
        </div>
        <YourPlaylist playlist={playlist} setPlaylist={handleSetPlaylist} />
      </div>
    </div>
  );
}

export default Home;
