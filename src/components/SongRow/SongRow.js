import React from "react";
import { useDispatch } from "react-redux";
import { getSongURLbyID } from "../../api";
import "./SongRow.css";

function SongRow({ id, artists, name, pic, album }) {
  const dispatch = useDispatch();
  const rowClick = async () => {
    console.log("rowClick", name);
    console.log("rowClick", id);
    const response = await getSongURLbyID(id);

    let musicUrl = response.data.data[0].url;
    console.log("MusicUrl ", musicUrl);

    if (musicUrl == null) {
      console.log("Currently Do Not Have this music");
      dispatch({
        type: "SET_MESSAGE",
        open: true,
        severity: "info",
        message: "This music currently not available !",
      });
    } else {
      let audioList = [
        {
          name: name,
          singer: artists[0].name,
          cover: pic,
          musicSrc: musicUrl,
          musicId: id,
        },
      ];
      dispatch({
        type: "APPEND_AUDIO_LIST",
        audioList: audioList,
      });
      dispatch({
        type: "SET_MESSAGE",
        open: true,
        severity: "success",
        message: "Add to the playlist successfully !",
      });
    }
  };

  return (
    <div className="songRow" onClick={rowClick}>
      {pic ? <img className="songRow_album" src={pic} alt="album" /> : null}
      <div className="songRow_info">
        <h1>{name}</h1>
        <p>
          {artists.map((artist) => artist.name).join(", ")} - {album.name}
        </p>
      </div>
    </div>
  );
}
export default SongRow;
