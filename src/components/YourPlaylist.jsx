import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const YourPlaylist = ({ playlist, setPlaylist }) => {
  // delete button logic
  const handleDelete = (id) =>
    setPlaylist((prev) => prev.filter((item) => item.id !== id));

  // move up button logic
  const handleMoveUp = (song) =>
    setPlaylist((prev) => [
      song,
      ...prev.filter((item) => item.id !== song.id),
    ]);

  // move down button logic
  const handleMoveDown = (song) =>
    setPlaylist((prev) => [
      ...prev.filter((item) => item.id !== song.id),
      song,
    ]);

  // maps songs added to the playlist
  const displayPlaylist = () => {
    if (playlist)
      return playlist.map((song) => (
        <div className="playlist-song" key={song.id}>
          <div className="search-result-text">
            <h3>
              {song.title}, {song.artist.name}
            </h3>
            <h5>{song.album.title}</h5>
          </div>
          <img src={song.album.cover_small} alt="Album's Cover" />
          <div className="playlist-icons">
            <Icon
              icon="ic:round-expand-circle-down"
              rotate={2}
              onClick={() => handleMoveUp(song)}
              className="icon"
            />
            <Icon
              icon="ic:round-cancel"
              onClick={() => handleDelete(song.id)}
              className="icon"
            />
            <Icon
              icon="ic:round-expand-circle-down"
              onClick={() => handleMoveDown(song)}
              className="icon"
            />
            <Link to={`/playlist-creator/${song.id}`}>
              <Icon
                icon="heroicons:magnifying-glass-circle-20-solid"
                className="icon"
              />
            </Link>
          </div>
        </div>
      ));
  };

  return <>{displayPlaylist()}</>;
};

export default YourPlaylist;
