import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: { marginRight: theme.spacing(3) },
}));

export default function StatusChip() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Chip
        icon={<SentimentDissatisfiedIcon />}
        label="offline"
        clickable
        onDelete={handleClickOpen}
        onClick={handleClickOpen}
        deleteIcon={<RefreshIcon />}
        variant="outlined"
        className={classes.root}
      />
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Not Implemented</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            This is a placeholder for a future feature, thank you for clicking!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Understood
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
