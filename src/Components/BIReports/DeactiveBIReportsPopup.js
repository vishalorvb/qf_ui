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
import useAxios from "../../hooks/useAxios";

function DeactiveBIReportsPopup(props) {
  const {
    openDeactive,
    setOpenDeactive,
    object,
    getReports,
    setDeactSuccessMsg,
  } = props;
  const id = object.report_id;
  const axiosPrivate = useAxios();

  const handleClose = () => {
    setOpenDeactive(false);
  };

  const submit = () => {
    axiosPrivate
      .post(`Biservice/configbireport/testset/status?report_id=${id}&status=0`)
      .then((res) => {
        console.log(res.message);
        setDeactSuccessMsg(true);
        getReports();
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
                <span>Are you sure you want to Deactivate</span>
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

export default DeactiveBIReportsPopup;
