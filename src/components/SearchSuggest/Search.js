import React, { useEffect, useState } from "react";
import { searchByKeyWord } from "../../api";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  //const [search, setSearch] = useState("");
  const [suggestResult, setResult] = useState({});

  const searchKeyWord = async () => {
    const response = await searchByKeyWord("王源");
    let result = response.data.result;
    let suggest = result["order"];

    setOptions(suggest);
    console.log(suggest);
    console.log(result);
    setResult(result);
  };

  useEffect(() => {
    searchKeyWord();
  }, []);

  return (
    <div className="flex-container flex-column pos-rel">
      <SearchIcon />
      <input
        id="auto"
        placeholder="Type to search"
        onClick={() => setDisplay(!display)}
      />
      {display && (
        <div className="autoContainer">
          {options.map((value, i) => {
            return (
              <div className="options" key={i}>
                <div className="option-title">{value}</div>
                <div className="options-item">
                  {suggestResult[value].map((info, index) => (
                    <div>{info.name}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
