import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Main from "./components/Main";
import AppBar from "./components/AppBar";

// const ENDPOINT = "http://moneypi:8080/";
const url = "wss://ws-feed.pro.coinbase.com";

function App() {
  const socketRef = useRef(new WebSocket(url));
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark",
        },
      }),
    []
  );
  const [currencies, setCurrencies] = useState([]);
  const [products, setProducts] = useState([]);
  const [tickerData, setTickerData] = useState({});
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    axios.get("https://api.pro.coinbase.com/products/").then(({ data }) => {
      const filtered = data.filter(
        (product) => product.quote_currency === "USD"
      );
      setProducts(filtered);
    });
    axios
      .get("https://api.pro.coinbase.com/currencies")
      .then(({ data }) => setCurrencies(data));
  }, []);

  const loaded = !!products.length && !!currencies.length;

  useEffect(() => {
    const { current: socket } = socketRef;
    // eslint-disable-next-line no-console
    socket.onerror = (error) => console.log("error:", error);
    socket.onopen = () => {
      setConnected(true);
    };
  }, [socketRef]);

  socketRef.current.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type !== "ticker") {
      return;
    }
    setTickerData({ ...tickerData, [data.product_id]: data });
  };
  const [tickers, setTickers] = useState(new Set([]));

  useEffect(() => {
    const myStorage = window.localStorage;
    const storedTickers = myStorage.getItem("tickers") ?? "";
    const newTickerSet = storedTickers.length
      ? new Set(storedTickers.split(","))
      : new Set();
    setTickers(newTickerSet);
  }, []);

  const setTickerLocalStorage = (tickerSet) => {
    const myStorage = window.localStorage;
    myStorage.setItem("tickers", Array.from(tickerSet).join(","));
  };

  const removeTicker = (ticker) =>
    setTickers((oldTickers) => {
      const newTickerSet = new Set(oldTickers);
      newTickerSet.delete(ticker);
      setTickerLocalStorage(newTickerSet);
      return newTickerSet;
    });

  const addTicker = (ticker) =>
    setTickers((oldTickers) => {
      const newTickerSet = new Set(oldTickers);
      newTickerSet.add(ticker);
      setTickerLocalStorage(newTickerSet);
      return newTickerSet;
    });

  const filteredProducts = products
    .filter((product) => !tickers.has(product.id))
    .sort(({ id: tickerA }, { id: tickerB }) => {
      if (tickerA > tickerB) {
        return 1;
      }
      if (tickerA < tickerB) {
        return -1;
      }
      return 0;
    });

  return (
    <ThemeProvider theme={theme}>
      <AppBar />
      <Container maxWidth="lg" className="App">
        <CssBaseline />
        <Main
          tickerData={tickerData}
          socket={socketRef.current}
          socketConnected={connected}
          tickers={tickers}
          removeTicker={removeTicker}
          addTicker={addTicker}
          loaded={loaded}
          coinbaseProducts={filteredProducts}
          coinbaseCurrencies={currencies}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
