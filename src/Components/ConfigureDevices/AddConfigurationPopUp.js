import React, { useEffect } from "react";
import {Button,Grid,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material";
import { useForm } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import * as yup from "yup";

let initialval = {
  name: "",
  url: "",
  organizationId: "",
  userId: "",
  lastModified: "",
  objApiKey: "",
  deviceType: 1,
  userName: "",
  accessKey: "",
  project_id: "",
  config_location: "",
  config_obj: "",
  platform_type: "",
};

let postVal = { ...initialval };

const AddConfigurationPopUp = (props) => {
  const { open, close, setSnack, projectId ,getConfigurations} = props;
  const { auth } = useAuth();
  const schema = yup.object().shape({ testcaseName: yup.string().required() });
  const organizationId = auth.info.organization_id;
  const userId = auth.info.id;
  const navigate = useNavigate();
 
  const {
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const handleClose = () => {
    reset();
    close(false);
  };
  const onSubmitHandler = (params) => {
    if (validateFormbyName(["name", "platform_type", "config_location","config_obj"], "error")) {
      postVal.accessKey="";
      postVal.deviceType=1;
      postVal.lastModified="";
      postVal.objApiKey="";
      postVal.project_id=projectId;
      postVal.url="";
      postVal.organizationId=organizationId;
      postVal.userId=userId;
      postVal.userName="";
      axios.post(`/qfservice/mobileconfiguration/save.do`, postVal)
      .then((resp) => {
          resp?.data?.status === "SUCCESS" && setSnack(true)
          getConfigurations(projectId)
          resp?.data?.status === "SUCCESS" && handleClose()
        });
    }
  };

  useEffect(() => {
    return () => {
      postVal = { ...initialval };
    };
  }, []);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle className="dialogTitle"> Add Configuration</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <label>Configure Name :</label>
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                type="text"
                name="name"
                sx={{ width: 300 }}
                onChange={(e) => {postVal.name = e.target.value;}}
                InputLabelProps={{shrink: true,}}
              />
            </Grid>
            <Grid item xs={2}>
              <label>Platform : </label>
            </Grid>
            <Grid item xs={10}>
              <Select
                sx={{ width: 150 }}
                name="platform_type"
                onChange={(e) => {postVal.platform_type = e.target.value;}}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="1">Android</MenuItem>
                <MenuItem value="2">Ios</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <label>Execution Environment : </label>
            </Grid>
            <Grid item xs={10}>
              <Select
                sx={{ width: 150 }}
                name="config_location"
                onChange={(e) => {postVal.config_location = e.target.value;}}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>Local</MenuItem>
                <MenuItem value={2}>Cloud</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <label>Device Object Info : </label>
            </Grid>
            <Grid item xs={10}>
              <TextareaAutosize
                style={{ width: 400, height: 200 }}
                name="config_obj"
                onChange={(e) => {postVal.config_obj = e.target.value;}}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Button variant="contained" type="submit" onClick={onSubmitHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddConfigurationPopUp;
