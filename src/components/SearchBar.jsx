import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="search">
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm.replaceAll("%20", " ")}
        onChange={(e) => setSearchTerm(e.target.value.replaceAll(" ", "%20"))}
      />
    </form>
  );
};

export default SearchBar;
