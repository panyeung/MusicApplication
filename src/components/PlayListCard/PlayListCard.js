import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import { red } from "@material-ui/core/colors";
import Chip from "@material-ui/core/Chip";
import { getPlayListSongs } from "../../api";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  chip: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

const PlayListCard = (props) => {
  const { name, subscribedCount, coverImgUrl, tags, id } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const CardClick = async () => {
    const response = await getPlayListSongs(id);
    console.log("currentPlaylist", response.data);
    dispatch({
      type: "SET_PLAYLIST",
      currentPlayList: response.data,
    });

    props.history.push("/songlist");
  };
  return (
    <Card
      className={classes.root}
      onClick={() => {
        CardClick();
      }}
    >
      <CardActionArea>
        <CardHeader
          title={name}
          subheader={`Subscribed Count ${subscribedCount}`}
        />
        <CardMedia
          className={classes.media}
          image={coverImgUrl}
          title="coverImgUrl"
        />
        <CardContent>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <div className={classes.chip}>
          {tags.map((tag, i) => (
            <Chip key={i} label={tag} color="primary" />
          ))}
        </div>
      </CardActions>
    </Card>
  );
};

export default withRouter(PlayListCard);
