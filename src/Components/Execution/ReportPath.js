import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Grid, Typography } from "@mui/material";
import axios from "../../api/axios";
import TextField from "@mui/material/TextField";

function ReportPath(props) {
  const { open, close, buildEnvId } = props;
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [path, setPath] = useState(" ");

  const handleClose = () => {
    close(false);
  };

  const onSubmitHandler = (params) => {
    {
      axios
        .post(
          `/qfservice/updatereportpath?reportpath=${path}&env_id=${buildEnvId}`
        )
        .then((resp) => {
          console.log(resp);
          if (resp?.data?.message === "Successfully updated") {
            setReportSuccessMsg(true);
            setTimeout(() => {
              setReportSuccessMsg(false);
            }, 3000);
            handleClose();
          } else {
            setReportFailMsg(true);
            setTimeout(() => {
              setReportFailMsg(false);
            }, 3000);
            handleClose();
          }
        });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="dialogTitle">Report Path</DialogTitle>
        <DialogContent>
          <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            justifyItems="center"
            sx={{ marginTop: "15px" }}
          >
            <Grid xs={2} sx={{ marginTop: "15px" }}>
              {" "}
              Report Path:{" "}
            </Grid>

            <Grid xs={8}>
              {" "}
              <TextField
                size="small"
                fullWidth
                id="outlined-basic"
                variant="outlined"
                placeholder="Report path"
                name="path"
                onChange={(e) => {
                  setPath(e.target.value);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" onClick={onSubmitHandler}>
            Save & Continue
          </Button>
        </DialogActions>
      </Dialog>
      <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="Created successfully"
        severity="success"
      />
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="Not Created."
        severity="error"
      />
    </>
  );
}

export default ReportPath;
