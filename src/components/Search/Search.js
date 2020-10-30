import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import "./Search.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
}));

const Search = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  let history = useHistory();

  const onFormSubmit = (event) => {
    event.preventDefault();
    history.push(`/search/${value}`);
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onFormSubmit}
      style={{ width: "100%" }}
    >
      <div>
        <input
          className="key-word"
          onChange={handleChange}
          variant="filled"
          value={value}
        />
      </div>
    </form>
  );
};

export default Search;
