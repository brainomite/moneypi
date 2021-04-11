import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});
export default function ProductList({
  coinbaseProducts,
  opened,
  setOpened,
  addTicker,
}) {
  const classes = useStyles();
  const products = coinbaseProducts.map((product) => {
    const addIt = () => addTicker(product.id);
    const currency = product.base_currency.toLowerCase();
    return (
      <ListItem button key={product.id} onClick={addIt}>
        <ListItemIcon>
          <i className={`cf cf-${currency}`} />
        </ListItemIcon>
        <ListItemText primary={product.display_name} />
      </ListItem>
    );
  });
  return (
    <Drawer anchor={"left"} open={opened} onClose={() => setOpened(false)}>
      <List className={classes.list}>{products}</List>
    </Drawer>
  );
}
