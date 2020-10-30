import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./discovery.css";
import PlayListCard from "../../components/PlayListCard/PlayListCard";
import { getTopPlaylist } from "../../api";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../components/Header/Header";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";

export const Discovery = () => {
  //const classes = useStyles();
  const [PlayLists, setPlayLists] = useState([]);
  const [playListPerPage] = useState(12);
  const [Total, setTotal] = useState(0);
  const [Loading, setLoading] = useState(false);

  const getPlayLists = async (limit, offset) => {
    setLoading(true);
    const response = await getTopPlaylist(limit, offset);
    console.log("Popular PlayList", response.data);
    const playlists = response.data.playlists;
    setPlayLists(playlists);
    setTotal(response.data.total);
    setLoading(false);
  };

  useEffect(() => {
    getPlayLists(playListPerPage, 0);
  }, [playListPerPage]);

  const pageChange = async (event, number) => {
    setLoading(true);
    console.log("pageChange", number);
    await getPlayLists(playListPerPage, number * playListPerPage);
    setLoading(false);
  };

  return (
    <div className="discover">
      <Header />
      {Loading ? (
        <CircularSpinner className="spinner" />
      ) : (
        <Grid container spacing={3}>
          {PlayLists?.map((playList, i) => (
            <Grid item xs={6} lg={4} key={i}>
              <PlayListCard {...playList}></PlayListCard>
            </Grid>
          ))}
        </Grid>
      )}
      <Pagination
        className="pagination"
        count={Math.floor(Total / playListPerPage)}
        onChange={pageChange}
        variant="outlined"
        shape="rounded"
      />
    </div>
  );
};

export default Discovery;
