import React from "react";
import PropTypes from "prop-types";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import coinbaseTickerDataPropType from "../../propTypeValidations/coinbaseTickerDataPropType";
import ListPriceItem from "./ListPriceItem";

function Main({ tickers, socketConnected, socket, tickerData, removeTicker }) {
  const priceCards = Array.from(tickers).map((ticker) => (
    <ListPriceItem
      socketConnected={socketConnected}
      socket={socket}
      currency={ticker}
      tickerData={tickerData}
      removeTicker={removeTicker}
    />
  ));

  return (
    <List
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Watch List
        </ListSubheader>
      }
    >
      {priceCards}
    </List>
  );
}

Main.propTypes = {
  tickers: PropTypes.instanceOf(Set).isRequired,
  socketConnected: PropTypes.bool.isRequired,
  socket: PropTypes.instanceOf(WebSocket).isRequired,
  tickerData: coinbaseTickerDataPropType.isRequired,
  removeTicker: PropTypes.func.isRequired,
};

export default Main;
