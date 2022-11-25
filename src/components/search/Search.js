import React, { useState } from "react";
import "./Search.css";

const Search = () => {
  const [searchContact, setSearchContact] = useState("");
    console.log(searchContact)
  return (
    <div className="container">
      <input
        type="search"
        className="search"
        onChange={(e) => setSearchContact(e.target.value)}
        placeholder="Search for contacts...."
      />
    </div>
  );
};

export default Search;
