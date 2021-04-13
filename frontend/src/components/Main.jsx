import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";
import Loading from "./Loading";
import ProductList from "./ProductList";
import coinbaseProductsPropType from "../propTypeValidations/coinbaseProductsPropType";
import coinbaseTickerDataPropType from "../propTypeValidations/coinbaseTickerDataPropType";
import WatchList from "./WatchList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Main({
  loaded,
  tickers,
  coinbaseProducts,
  addTicker,
  socketConnected,
  socket,
  tickerData,
  removeTicker,
}) {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  if (!loaded) {
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Tickers
        <IconButton variant="outlined" onClick={() => setOpened(true)}>
          <AddIcon />
        </IconButton>
      </Typography>
      <ProductList
        coinbaseProducts={coinbaseProducts}
        opened={opened}
        setOpened={setOpened}
        addTicker={addTicker}
      />
      <WatchList
        socketConnected={socketConnected}
        socket={socket}
        tickerData={tickerData}
        removeTicker={removeTicker}
        tickers={tickers}
      />
    </div>
  );
}

Main.propTypes = {
  loaded: PropTypes.bool.isRequired,
  tickers: PropTypes.instanceOf(Set).isRequired,
  coinbaseProducts: coinbaseProductsPropType.isRequired,
  addTicker: PropTypes.func.isRequired,
  socketConnected: PropTypes.bool.isRequired,
  socket: PropTypes.instanceOf(WebSocket).isRequired,
  tickerData: coinbaseTickerDataPropType.isRequired,
  removeTicker: PropTypes.func.isRequired,
};

export default Main;
