import { useRef, useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CryptoAvatar from "./CryptoAvatar";
export default function PriceCard({
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
    if (!connected) return;
    let msg = {
      type: "subscribe",
      product_ids: [currency],
      channels: ["ticker"],
    };
    let jsonMsg = JSON.stringify(msg);
    io.current.send(jsonMsg);
    const socketIo = io.current;
    return () => {
      let msg = {
        type: "unsubscribe",
        product_ids: [currency],
        channels: ["ticker"],
      };
      let jsonMsg = JSON.stringify(msg);
      socketIo.send(jsonMsg);
    };
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
