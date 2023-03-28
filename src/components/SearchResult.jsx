import React from "react";
import { Icon } from "@iconify/react";

const SearchResult = ({ data, setPlaylist }) => {
  const result = () => {
    if (data)
      if ("data" in data)
        if (data.data[0])
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
                />
              </div>
            </div>
          ));
  };

  return <>{result()}</>;
};

export default SearchResult;
