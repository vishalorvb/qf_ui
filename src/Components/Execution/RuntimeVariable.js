import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { Divider, Grid, Typography } from "@mui/material";
import axios from "../../api/axios";
import { useState } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

function RuntimeVariable(props) {
  const {
    projectId,
    applicationId,
    applicationType,
    open,
    close,
    envId,
    runtimeVar,
  } = props;
  const [variables, setVariables] = useState("");
  const schema = yup.object().shape({
    testcaseName: yup.string().required().max(30, "Max length exceeded"),
  });
  const [snack, setSnack] = useState(false);

  // console.log(envId)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    reset();
    close(false);
  };

  const onSubmitHandler = () => {
    axios
      .putForm(`/qfservice/updateruntimevariables`, {
        runtimevars: variables,
        env_id: envId,
      })
      .then((res) => {
        if (res?.data?.status === "SUCCESS") {
          handleClose();
          setSnack(true);
          setTimeout(() => {
            setSnack(false);
          }, 3000);
        }
      });
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="dialogTitle">RunTime Variables</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogContent>
            <Typography variant="subtitle1">
              <b style={{ color: "#5C6780", fontSize: "20px" }}>Variables</b>
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              defaultValue={runtimeVar}
              placeholder="{key:value}"
              style={{
                width: 550,
                height: 300,
                marginTop: "10px",
                padding: "10px",
              }}
              onChange={(e) => setVariables(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={onSubmitHandler}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <SnackbarNotify
        open={snack}
        close={setSnack}
        msg={"Updated Successfully!"}
        severity="success"
      />
    </>
  );
}

export default RuntimeVariable;
