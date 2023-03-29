import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleOnChange = (e) => setSearchTerm(e.target.value);
  return (
    <form className="search">
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleOnChange}
      />
    </form>
  );
};

export default SearchBar;
