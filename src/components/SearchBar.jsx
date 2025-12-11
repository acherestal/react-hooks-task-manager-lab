import React, { useRef, useState } from "react";
import TaskList from "./TaskList";

function SearchBar() {
  const searchRef = useRef("");
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    searchRef.current = e.target.value; // required by assignment
    setQuery(e.target.value);           // required by tests
  }

  return (
    <div className="search-container">
      <input
        ref={searchRef}
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearch}
      />
      <TaskList query={query} />
    </div>
  );
}

export default SearchBar;
