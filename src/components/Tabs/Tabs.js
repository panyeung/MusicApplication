import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import Search from "../Search/Search";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState("discovery");
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/discovery/${newValue}`);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="discovery" value="discovery" />
        <Tab label="Top PlayList" value="highQuality" />
        <Tab label="My PlayList" value="MyPlayList" />
      </Tabs>
    </Paper>
  );
}
