import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

function ConfirmPop(props) {
  let { open, handleClose, heading, message, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{ marginLeft: "15px", marginTop: "20px" }}
    >
      <DialogTitle
        id="alert-dialog-title"
        className="dialogTitle border-bottom"
        sx={{
          padding: 0.5,
          backgroundColor: "#009fee",
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="poptitle"
        >
          <Typography
            sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }}
            variant="inherit"
          >
            {heading}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleClose}
            className="btn-close "
          >
            <ClearIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent
        className="DeleteUsers"
        style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}
      >
        <div>
          <form>
            <div>{message}</div>
          </form>
        </div>
      </DialogContent>
      <DialogActions
        style={{
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          onClick={onConfirm}
          variant="contained"
          startIcon={<CheckSharpIcon></CheckSharpIcon>}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmPop;
