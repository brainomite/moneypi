import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    "margin-top": "30vh",
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <CircularProgress size="5rem" />
    </Grid>
  );
}
