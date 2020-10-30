import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { searchByKeyWord } from "../../api";
import SongRow from "../../components/SongRow/SongRow";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../components/Header/Header";
import "./Search.css";

function Search() {
  let { keyword } = useParams();
  const [rows, setRows] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [limit] = useState(30);
  const [SongCount, setSongCount] = useState(0);

  const searchKeyword = useCallback(
    async (number) => {
      setLoading(true);
      console.log(limit * number);
      const response = await searchByKeyWord(keyword, limit, limit * number);
      console.log(response.data);
      let result = response.data.result.songs;
      console.log("KeywordSearch", result);
      setRows(result);
      setLoading(false);
      setSongCount(response.data.result.songCount);
    },
    [limit, keyword]
  );

  useEffect(() => {
    searchKeyword(0);
  }, [keyword, searchKeyword]);

  const pageChange = async (event, number) => {
    setLoading(true);
    await searchKeyword(number - 1);
    setLoading(false);
  };

  return (
    <div className="search-page">
      <Header />
      <h2>{keyword}</h2>
      {Loading ? (
        <CircularSpinner />
      ) : (
        rows.map((row, i) => (
          <SongRow
            key={row.id}
            id={row.id}
            artists={row.artists}
            name={row.name}
            album={row.album.name}
          />
        ))
      )}
      <Pagination
        className="pagination"
        count={Math.floor(SongCount / limit) + 1}
        onChange={pageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
}

export default Search;
