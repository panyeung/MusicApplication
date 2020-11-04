import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import discovery from "./pages/discovery/Discovery";
import playList from "./pages/playList/PlayList";
import Search from "./pages/Search/Search";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import storageUtils from "./utils/storageUtils";
import { getAudioListsFromIds } from "./helper/getAudioListFromIds";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  const [error, setError] = useState(false);
  //const [currentPlayIndex, setCurrentPlayIndex] = useState(0);

  const curPlayList = useSelector(
    (state) => state.playListReducer.currentPlayList
  );

  let audioList = useSelector((state) => {
    if (state.playListReducer.audioList.length === 0) {
      return storageUtils.getAudioLists();
    } else {
      return state.playListReducer.audioList;
    }
  });

  const dispatch = useDispatch();
  const SongDelete = (currentPlayId, audioLists, audioInfo) => {
    if (error === false) {
      console.log(audioLists);
      dispatch({
        type: "SET_AUDIO_LIST",
        audioList: audioLists,
      });
      storageUtils.removeAudioLists();
      storageUtils.saveAudioLists(audioLists);
    }
  };

  const onAudioError = async (errMsg, currentPlayId, audioLists, audioInfo) => {
    if (error === false) {
      setError(true);
      console.log("onAudioError!!!", audioInfo);
      const storeAudioList = storageUtils.getAudioLists();
      let ids = [];
      storeAudioList.map((song, index) => {
        ids.push(song.musicId);
        return null;
      });
      const updatedAudioList = await getAudioListsFromIds(ids, storeAudioList);
      dispatch({
        type: "SET_AUDIO_LIST",
        audioList: updatedAudioList,
      });
      setError(false);
    }
  };

  const onPlayIndexChange = (playIndex) => {
    console.log("onPlayIndexChange", playIndex);
    //setCurrentPlayIndex(playIndex);
  };

  return (
    <BrowserRouter>
      <Switch>
        {curPlayList && <Route path="/songlist" component={playList} />}
        <Route path="/search/:keyword" component={Search} />
        <Route path="/" component={discovery} />
      </Switch>
      <ErrorBoundary>
        <ReactJkMusicPlayer
          theme="dark"
          defaultPosition={{ top: "0%", left: "80%" }}
          audioLists={audioList}
          onAudioListsChange={SongDelete}
          showMediaSession
          spaceBar={true}
          autoPlay={false}
          onAudioError={onAudioError}
          clearPriorAudioLists={true}
          quietUpdate={true}
          muted="muted"
          glassBg={true}
          loadAudioErrorPlayNext={false}
          autoHiddenCover={true}
          onPlayIndexChange={onPlayIndexChange}
          rel="noreferrer"
        />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
