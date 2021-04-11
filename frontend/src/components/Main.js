import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PriceCard from "./PriceCard";
import Loading from "./Loading";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ProductList from "./ProductList";
import AddIcon from "@material-ui/icons/Add";

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

export default function Main(props) {
  const classes = useStyles();
  const [opened, setOpened] = useState(false);

  if (!props.loaded) {
    return (
      <div className={classes.root}>
        {/* <Typography variant="h2">Tickers</Typography> */}
        <Loading />
      </div>
    );
  }

  const priceCards = Array.from(props.tickers).map((ticker) => (
    <Grid key={ticker} item xs={3}>
      <PriceCard currency={ticker} {...props} />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Typography variant="h2">
        Tickers
        <IconButton variant="outlined" onClick={() => setOpened(true)}>
          <AddIcon />
        </IconButton>
      </Typography>
      <ProductList
        coinbaseProducts={props.coinbaseProducts}
        opened={opened}
        setOpened={setOpened}
        addTicker={props.addTicker}
      />
      <Grid container spacing={3}>
        {priceCards}
      </Grid>
    </div>
  );
}
