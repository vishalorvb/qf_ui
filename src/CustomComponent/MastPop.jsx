import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function MastPop(props) {
  return (
    <Dialog open={props.open} maxWidth="md">
      <DialogTitle className="dialogTitle">
        {props.heading}
        <span>
          <IconButton
            sx={{ float: "right" }}
            onClick={(e) => props.setOpen(false)}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </Dialog>
  );
}

export default MastPop;
