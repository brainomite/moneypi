import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import coinbaseTickerDataPropType from "../../propTypeValidations/coinbaseTickerDataPropType";
import CryptoAvatar from "../CryptoAvatar";

const useStyles = makeStyles(() => ({
  root: { display: "flex", "justify-content": "flex-end" },
}));

function PriceCard({
  socketConnected,
  socket,
  currency,
  tickerData,
  removeTicker,
}) {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const [connected, setConnected] = useState(socketConnected);
  if (connected !== socketConnected) setConnected(socketConnected);
  const io = useRef(socket);
  useEffect(() => {
    const socketIo = io.current;
    const sendType = (type) => {
      if (!connected) return;
      const msg = {
        type,
        product_ids: [currency],
        channels: ["ticker"],
      };
      const jsonMsg = JSON.stringify(msg);
      socketIo.send(jsonMsg);
    };
    sendType("subscribe");
    return () => sendType("unsubscribe");
  }, [connected, currency]);

  const [price, setPrice] = useState(null);

  const data = tickerData[currency];
  if (data && data.price !== price) setPrice(data.price);
  const handleDelete = () => removeTicker(currency);
  const lastTrade = data ? new Date(data.time).toLocaleString() : null;
  const sequence = data ? data.sequence : null;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen((currentOpen) => !currentOpen);
  return (
    <div key={currency}>
      <ListItem button>
        <ListItemIcon>
          <CryptoAvatar ticker={currency} />
        </ListItemIcon>
        <ListItemText primary={currency} secondary={price} />
        <IconButton edge="end" aria-label="delete" onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <ListItemSecondaryAction onClick={handleDelete}>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className={classes.root}>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            <ListItemText
              primary={`Last traded at: ${lastTrade}`}
              secondary={`sequence ID: ${sequence}`}
            />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

PriceCard.propTypes = {
  socketConnected: PropTypes.bool.isRequired,
  socket: PropTypes.instanceOf(WebSocket).isRequired,
  currency: PropTypes.string.isRequired,
  tickerData: coinbaseTickerDataPropType.isRequired,
  removeTicker: PropTypes.func.isRequired,
};

export default PriceCard;
