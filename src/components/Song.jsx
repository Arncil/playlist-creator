import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import options from "../utils/api";
import { Icon } from "@iconify/react";

const Song = () => {
  const { id } = useParams();
  const [thisSong, setThisSong] = useState(null);
  const [reload, setReload] = useState(0);

  // fetch from API by song id
  useEffect(() => {
    fetch(`${options.url}/track/${id}`, options)
      .then((response) => response.json())
      .then((response) => setThisSong(response))
  }, [id, reload]);

  return (
    <div className="song">
      <div className="song-container">
        <div className="song-icons">
          <Link to="/playlist-creator/">
            <Icon icon="mdi:arrow-back-circle" className="icon" />
          </Link>
          <Icon
            icon="ion:reload-circle-sharp"
            className="icon"
            onClick={() => setReload(reload + 1)}
          />
        </div>
        <div className="song-data">
          <h1>{thisSong?.title || "loading..."}</h1>
          <h2>{thisSong?.artist?.name || "loading..."}</h2>
          <h3>{thisSong?.album?.title || "loading..."}</h3>
          <h3>{thisSong?.release_date || "loading..."}</h3>
          <a href={thisSong?.link} target="_blank">
            See more...
          </a>
        </div>
        <img src={thisSong?.album?.cover_medium || ""} alt="Album\'s Cover" />
      </div>
    </div>
  );
};

export default Song;
