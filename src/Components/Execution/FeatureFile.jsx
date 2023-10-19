import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from "@mui/material";
import { useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { qfservice } from "../../Environment";

function FeatureFile(props) {
  const { selectedDatasets, open, close, testcaseId } = props;
  const schema = yup.object().shape({
    testcaseName: yup.string().required().max(30, "Max length exceeded"),
  });
  const { handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [featureFileData, setFeatureFileData] = useState("");
  const [snack, setSnack] = useState(false);
  const [snackselectedDatasets, setSnackselectedDatasets] = useState(false);
  const handleClose = () => {
    reset();
    close(false);
  };

  const onSubmitHandler = () => {
    if (selectedDatasets.length !== 0) {
      axios
        .post(
          `${qfservice}/qfservice/webtestcase/updatefeaturefile?featurefile_data=${featureFileData}&testcase_id=${testcaseId}`
        )
        .then((res) => {
          if (res?.data?.status === "SUCCESS") {
            handleClose();
            setSnack(true);
            setTimeout(() => {
              setSnack(false);
            }, 3000);
          }
        });
    } else {
      handleClose();
      setSnackselectedDatasets(true);
      setTimeout(() => {
        setSnackselectedDatasets(false);
      }, 3000);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="dialogTitle">Feature File</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogContent>
            <Typography variant="subtitle1">
              <b style={{ color: "#5C6780", fontSize: "20px" }}>
                Feature File content
              </b>
            </Typography>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={5}
              style={{
                width: 550,
                height: 300,
                marginTop: "10px",
                padding: "10px",
              }}
              onChange={(e) => setFeatureFileData(e.target.value)}
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
      {snack && (
        <SnackbarNotify
          open={snack}
          close={setSnack}
          msg={"Updated Successfully!"}
          severity="success"
        />
      )}
      {snackselectedDatasets && (
        <SnackbarNotify
          open={snackselectedDatasets}
          close={setSnackselectedDatasets}
          msg={"Please select atleast one dataset."}
          severity="error"
        />
      )}
    </>
  );
}

export default FeatureFile;
