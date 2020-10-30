import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  PaginationStyle: {
    color: "white",
  },
}));

function Pagination(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination className={classes.PaginationStyle} {...props} />
    </div>
  );
}

export default Pagination;
