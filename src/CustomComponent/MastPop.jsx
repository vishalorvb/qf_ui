import { Dialog, IconButton } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function MastPop(props) {
  return (
    <Dialog open={props.open} maxWidth="md">
      <div
        style={{ backgroundColor: "#009fee", padding: "7px", color: "white" }}
      >
        <h2>
          {props.heading}
          <span>
            <IconButton sx={{ float: "right" }} onClick={e=>props.setOpen(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </span>
        </h2>
      </div>
      <div style={{ padding: "10px" }}>{props.children}</div>
    </Dialog>
  );
}

export default MastPop;
