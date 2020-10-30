import React, { useEffect, useState, useCallback } from "react";
import "./PlayList.css";
import Header from "../../components/Header/Header";
import PlayListTitle from "../../components/PlayListTitle/PlayListTitle";
import SongRow from "../../components/SongRow/SongRow";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import { useSelector } from "react-redux";
import { getSongDetailById } from "../../api";
import Pagination from "@material-ui/lab/Pagination";

function PlayList() {
  const curPlayList = useSelector(
    (state) => state.playListReducer.currentPlayList
  ).playlist;
  let tracks = [];
  curPlayList.trackIds?.map((trackId, i) => tracks.push(trackId.id));
  const [Tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [Loading, setLoading] = useState(false);

  const getTrackInfo = useCallback(async (number) => {
    setLoading(true);
    let currTrack = tracks.slice(number * 10, number * 10 + 10);
    let query = currTrack.join(",");
    console.log(query);
    const response = await getSongDetailById(query);
    let result = response.data;
    console.log("Get Song Info", result);
    setTracks(result.songs);
    setCurrentTrack(currTrack);
    setLoading(false);
  }, []);

  useEffect(() => {
    getTrackInfo(0);
  }, [getTrackInfo]);

  const pageChange = async (event, number) => {
    console.log("PageNumber", number);
    setLoading(true);
    await getTrackInfo(number - 1);
    setLoading(false);
  };

  return (
    <div className="player">
      <div className="body">
        <Header />
        <PlayListTitle tracks={currentTrack} tracksInfo={Tracks} />
        {Loading ? (
          <CircularSpinner />
        ) : (
          Tracks?.map((song, i) => (
            <SongRow
              key={song.id}
              id={song.id}
              artists={song.ar}
              name={song.name}
              pic={song.al.picUrl}
              album={song.al}
            />
          ))
        )}
        <Pagination
          className="pagination"
          count={Math.floor(tracks.length / 10) + 1}
          onChange={pageChange}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default PlayList;
