import { useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import TextField from "@mui/material/TextField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import useHead from "../../hooks/useHead";
import { qfservice } from "../../Environment";

let initialValue = {
  id: 0,
  name: "",
  description: "",
  base_url: "",
  module_id: "",
  project_id: "",
  is_default: false,
  runtime_variables: "",
};

function AddEnvironmentPop(props) {
  const {
    addEnvironmentPop,
    close,
    getBuilEnvironment,
    projectId,
    applicationId,
  } = props;
  const { setSnackbarData } = useHead();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValue,
  });

  const handleClose = () => {
    close(false);
    reset(initialValue);
  };

  const onSubmitHandler = (data) => {
    data.module_id = applicationId;
    data.project_id = projectId;
    data.url = "";
    axios
      .post(`${qfservice}/qfservice/CreateBuildEnvironment`, data)
      .then((resp) => {
        setSnackbarData({
          status: true,
          message: resp?.data?.message,
          severity: resp?.data?.status ?? "SUCCESS",
        });
        if (resp?.data?.message === "Successfully createdBuild Environment") {
          getBuilEnvironment();
          handleClose();
        } else {
          handleClose();
        }
      });
  };

  return (
    <>
      <Dialog
        open={addEnvironmentPop}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="dialogTitle">Add Environment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid
              container
              spacing={2}
              justifyContent="flex-start"
              justifyItems="center"
              sx={{ marginTop: "5px" }}
            >
              <Grid xs={3} sx={{ marginTop: "15px" }}>
                Name<span className="importantfield">*</span>
              </Grid>

              <Grid xs={9}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Environment Name"
                  sx={{ width: "340px" }}
                  {...register("name", {
                    required: "Environment Name is required",
                  })}
                />
                {errors.name && (
                  <Typography color="error">{errors.name.message}</Typography>
                )}
              </Grid>
              <Grid xs={3} sx={{ marginTop: "30px" }}>
                Base URL<span className="importantfield">*</span>
              </Grid>
              <Grid xs={9}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Environment Base URL"
                  sx={{ marginTop: "15px", width: "340px" }}
                  {...register("base_url", {
                    required: "Environment Base URL is required",
                  })}
                />
                {errors.base_url && (
                  <Typography color="error">
                    {errors.base_url.message}
                  </Typography>
                )}
              </Grid>
              <Grid xs={3} sx={{ marginTop: "30px" }}>
                Description<span className="importantfield">*</span>
              </Grid>
              <Grid xs={9}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Environment Description"
                  sx={{ marginTop: "15px", width: "340px" }}
                  {...register("description", {
                    required: "Environment Description is required",
                  })}
                />
                {errors.description && (
                  <Typography color="error">
                    {errors.description.message}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <DialogActions>
              <Button variant="contained" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save & Continue
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddEnvironmentPop;
