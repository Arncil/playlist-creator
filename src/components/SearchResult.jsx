import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SearchResult = ({ data, setPlaylist }) => {
  // maps the list of search Results
  const result = () => {
    if (data && "data" in data && data.data[0])
      return data.data.map((song) => (
        <div className="search-result" key={song.id}>
          <div className="search-result-text">
            <h3>
              {song.title}, {song.artist.name}
            </h3>
            <h5>{song.album.title}</h5>
          </div>
          <img src={song.album.cover_small} alt="Album's Cover" />
          <div className="search-result-icon">
            <Icon
              icon="ic:baseline-add-circle"
              onClick={() => setPlaylist((prev) => [...prev, song])}
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

  return <>{result()}</>;
};

export default SearchResult;
