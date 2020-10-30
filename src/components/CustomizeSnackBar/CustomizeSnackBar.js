import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars() {
  const classes = useStyles();
  //const [open, setOpen] = useState(false);
  const open = useSelector((state) => state.SnackBarReducer.open);
  const severity = useSelector((state) => state.SnackBarReducer.severity);
  const message = useSelector((state) => state.SnackBarReducer.message);
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   dispatch({
  //     type: "SET_MESSAGE",
  //     open: false,
  //     severity: "",
  //   });
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({
      type: "SET_MESSAGE",
      open: false,
      severity: "",
    });
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
