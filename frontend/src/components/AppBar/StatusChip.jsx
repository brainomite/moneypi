import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import React, { useState, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: { marginRight: theme.spacing(3) },
}));

export default function StatusChip() {
  const classes = useStyles();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status !== "loading") return;
    const hostname =
      process.env.NODE_ENV === "production" ? "moneypi.local" : "localhost";

    axios
      .get(`http://${hostname}:8080`)
      .then(() => setStatus("connected"))
      .catch(() => setStatus("disconnected"));
  }, [status]);

  const handleRefresh = () => setStatus("loading");

  return (
    <Chip
      icon={<SentimentDissatisfiedIcon />}
      label={status}
      onDelete={handleRefresh}
      deleteIcon={<RefreshIcon />}
      variant="outlined"
      className={classes.root}
    />
  );
}
