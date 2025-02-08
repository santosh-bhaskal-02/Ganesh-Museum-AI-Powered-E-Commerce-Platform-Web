import React, { useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { IdolContext } from "../ContextApi/IdolContext";

function Search() {
  const [searchText, setSearchText] = useState();
  const { setVideoList } = useContext(IdolContext);

  function searchInput(event) {
    setSearchText(event.target.value);
  }

  async function search() {
    console.log("clicked", searchText);
    if (searchText != "" || searchText != null) {
      try {
        const response = await axios.get(`/api/search`, {
          params: { query: searchText },
        });
        const result = response.data;
        setVideoList(result.items);
      } catch (err) {
        console.log(err);
      }
    }
    setSearchText("");
  }

  return (
    <div className="search-bar">
      <input
        placeholder="Search...."
        className="search-input"
        value={searchText}
        onChange={searchInput}
      />
      <div className="search-button">
        <SearchIcon onClick={search} />
      </div>
    </div>
  );
}

export default Search;