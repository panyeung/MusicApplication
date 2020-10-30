import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import { useDispatch, useSelector } from "react-redux";
import { getSongURLbyID } from "../../api";
import CircularSpinner from "../CircularSpinner/CircularSpinner";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "0.7",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    flex: "0.3",
    marginRight: "15px",
    backgroundSize: "contain",
  },
  controls: {
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  authorInfo: {
    alignItems: "center",
    display: "flex",
    paddingTop: theme.spacing(1),
  },
  marginR: {
    marginRight: theme.spacing(1),
  },
  Chip: {
    display: "flex",
    alignItems: "center",
    paddingBottom: theme.spacing(1),
  },
  Spinner: {
    marginLeft: "10px",
  },
}));

export default function PlayListTitle({ tracks, tracksInfo }) {
  const currentPlayList = useSelector(
    (state) => state.playListReducer.currentPlayList
  ).playlist;
  const classes = useStyles();

  const dispatch = useDispatch();
  const [SpinnerLoading, setLoading] = useState(false);

  const findMatch = (songUrl, tracksInfo) => {
    let infoId = tracksInfo.id;
    let SongSrc;
    let i = 0;
    while (i < songUrl.length) {
      if (songUrl[i].id === infoId) {
        SongSrc = songUrl[i].url;
        return SongSrc;
      }
      i++;
    }
    return null;
  };

  const playAll = async () => {
    setLoading(true);
    let query = tracks.join(",");
    const response = await getSongURLbyID(query);
    const result = response.data;
    console.log("PlayALL", result);
    console.log("songTracksInfo", tracksInfo);
    setLoading(false);

    let audioList = [];
    tracksInfo.map((Info, index) => {
      let SongUrl = findMatch(result.data, Info);
      //console.log(SongUrl);
      if (SongUrl != null) {
        let audio = {
          name: Info.name,
          singer: Info.ar[0].name,
          cover: Info.al.picUrl,
          musicSrc: SongUrl,
          musicId: Info.id,
        };
        audioList.push(audio);
      }
      return null;
    });
    dispatch({
      type: "APPEND_AUDIO_LIST",
      audioList: audioList,
    });
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={currentPlayList.coverImgUrl}
        title={currentPlayList.name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {currentPlayList.name}
          </Typography>
          <div className={classes.authorInfo}>
            <Avatar
              className={classes.marginR}
              alt="creator avatar"
              src={currentPlayList.creator.avatarUrl}
            />
            <Typography
              variant="subtitle1"
              color="textSecondary"
              className={classes.marginR}
            >
              {currentPlayList.creator.nickname}
            </Typography>
          </div>
        </CardContent>
        <div className={classes.controls}>
          <Button variant="contained" color="primary" onClick={playAll}>
            PlayAll
            {SpinnerLoading ? (
              <div className={classes.Spinner}>
                <CircularSpinner size={20} />
              </div>
            ) : null}
          </Button>
        </div>
        <div className={classes.Chip}>
          {currentPlayList.tags?.map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              color="primary"
              className={classes.marginR}
            />
          ))}
        </div>

        <Typography variant="subtitle2" color="textSecondary">
          Track Count: {currentPlayList.trackCount} Play Count:{" "}
          {currentPlayList.playCount}
        </Typography>

        <Typography variant="subtitle2" color="textSecondary">
          description : {currentPlayList.description}
        </Typography>
      </div>
    </Card>
  );
}
