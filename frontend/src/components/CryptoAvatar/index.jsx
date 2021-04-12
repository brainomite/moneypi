import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import PropTypes from "prop-types";
import cryptoIcons from "./cryptoSvgs";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));
function CryptoAvatar({ ticker }) {
  const classes = useStyles();
  const coinId = ticker.toLowerCase().split("-")[0];
  if (cryptoIcons[coinId]) {
    return (
      <Avatar alt={coinId} src={`assets/cryptoIcons/${cryptoIcons[coinId]}`} />
    );
  }
  return (
    <Avatar className={classes.orange}>
      <i className={`cf cf-${coinId}`} />
    </Avatar>
  );
}

CryptoAvatar.propTypes = {
  ticker: PropTypes.string.isRequired,
};

export default CryptoAvatar;
