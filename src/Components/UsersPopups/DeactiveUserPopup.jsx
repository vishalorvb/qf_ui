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
import React from "react";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { qfservice, userservice } from "../../Environment";

function DeactiveUserPopup(props) {
  const {
    openDeactive,
    setOpenDeactive,
    object,
    getUsers,
    setDeactSuccessMsg,
  } = props;
  const user = object.firstName + " " + object.lastName;
  const id = object.id;

  const { auth } = useAuth();
  const loggedInId = auth.info.id;

  const handleClose = () => {
    setOpenDeactive(false);
  };

  const submit = () => {
    axios
      .put(
        `${userservice}/user/UpdateUserStatus?current_user_id=${loggedInId}&user_id=${id}&user_status=0`
      )
      .then((res) => {
        console.log(res.message);
        setDeactSuccessMsg(true);
        getUsers();
        setTimeout(() => {
          setDeactSuccessMsg(false);
        }, 3000);
      });
    handleClose();
  };

  return (
    <div className="border" style={{ marginBottom: "20px", marginTop: "20px" }}>
      <Dialog
        open={openDeactive}
        onClose={handleClose}
        style={{ marginLeft: "15px", marginTop: "20px" }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dialogTitle border-bottom"
          sx={{
            padding: 0.5,
            backgroundColor: "rgba(137,196,244,1)",
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
              sx={{ marginLeft: 1, color: "white" }}
              variant="inherit"
            >
              Deactivate User
            </Typography>
            <IconButton
              sx={{ marginLeft: "auto" }}
              onClick={handleClose}
              className="btn-close "
            >
              <ClearOutlinedIcon sx={{ color: "white" }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent
          className="DeleteUsers"
          style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }}
        >
          <div>
            <form>
              <div>
                <span>Are you sure you want to Deactivate User {user}</span>
              </div>
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
            variant="contained"
            onClick={submit}
            startIcon={<PersonOffOutlinedIcon />}
          >
            Deactivate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeactiveUserPopup;
