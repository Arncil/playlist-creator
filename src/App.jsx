import React from "react";
import Home from "./components/Home";
import Song from "./components/Song";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/playlist-creator/" element={<Home />} />
        <Route path="/playlist-creator/:id/" element={<Song />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
