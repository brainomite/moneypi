import React, { useRef, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import PropTypes from "prop-types";
import CryptoAvatar from "../CryptoAvatar";
import coinbaseTickerDataPropType from "../../propTypeValidations/coinbaseTickerDataPropType";

function PriceCard({
  socketConnected,
  socket,
  currency,
  tickerData,
  removeTicker,
}) {
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
  return (
    <Card>
      <CardHeader
        avatar={<CryptoAvatar ticker={currency} />}
        title={currency}
        subheader={price}
      />
      <CardContent>
        <Typography variant="caption">Last traded at: {lastTrade}</Typography>
        <br />
      </CardContent>
      <CardActions>
        <Chip
          // color="secondary"
          size="small"
          onDelete={handleDelete}
          label="Remove"
        />
      </CardActions>
    </Card>
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
