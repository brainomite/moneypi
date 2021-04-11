import React from "react";
import cryptoIcons from "./cryptoSvgs";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
export default function CryptoAvatar({ ticker }) {
  const classes = useStyles();
  const coinId = ticker.toLowerCase().split("-")[0];
  if (cryptoIcons[coinId]) {
    return (
      <Avatar alt={coinId} src={`assets/cryptoIcons/${cryptoIcons[coinId]}`} />
    );
  } else {
    return (
      <Avatar className={classes.orange}>
        <i className={`cf cf-${coinId}`} />
      </Avatar>
    );
  }
}
