import React from "react";
import { Icon } from "@iconify/react";

const YourPlaylist = ({ playlist, setPlaylist }) => {

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
              onClick={() =>
                setPlaylist((prev) => [
                  song,
                  ...prev.filter((item) => item.id !== song.id),
                ])
              }
            />
            <Icon
              icon="ic:round-cancel"
              onClick={() =>
                setPlaylist((prev) =>
                  prev.filter((item) => item.id !== song.id)
                )
              }
            />
            <Icon
              icon="ic:round-expand-circle-down"
              onClick={() =>
                setPlaylist((prev) => [
                  ...prev.filter((item) => item.id !== song.id),
                  song,
                ])
              }
            />
          </div>
        </div>
      ));
  };

  return <>{displayPlaylist()}</>;
};

export default YourPlaylist;
