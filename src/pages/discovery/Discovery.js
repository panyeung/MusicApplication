import React, { useCallback, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import "./discovery.css";
import PlayListCard from "../../components/PlayListCard/PlayListCard";
import { getHighQualityPlayList, getTopPlaylist } from "../../api";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../components/Header/Header";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import { useLocation } from "react-router-dom";

export const Discovery = () => {
  const [PlayLists, setPlayLists] = useState([]);
  const [playListPerPage] = useState(12);
  const [Total, setTotal] = useState(0);
  const [Loading, setLoading] = useState(false);
  let location = useLocation();

  const getPlayLists = useCallback(
    async (limit, offset, route) => {
      setLoading(true);
      let response;
      if (route === "/discovery/highQuality") {
        response = await getHighQualityPlayList(limit);
      } else {
        response = await getTopPlaylist(limit, offset);
      }
      console.log("Popular PlayList", response.data);
      const playlists = response.data.playlists;
      setPlayLists(playlists);
      setTotal(response.data.total);
      setLoading(false);
    },
    [location.pathname]
  );

  useEffect(() => {
    getPlayLists(playListPerPage, 0, location.pathname);
  }, [playListPerPage, location.pathname]);

  const pageChange = useCallback(async (event, number) => {
    setLoading(true);
    await getPlayLists(playListPerPage, number * playListPerPage);

    setLoading(false);
  }, []);

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
