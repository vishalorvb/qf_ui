import React, { useEffect, useState } from "react";
import {Button,Grid,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material";
import { useForm } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import * as yup from "yup";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";

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
  plotform_type: "",
};

let postVal = { ...initialval };

const AddConfigurationPopUp = (props) => {
  const { auth } = useAuth();

  const organizationId = auth.info.organization_id;
  const userId = auth.info.id;
  const navigate = useNavigate();
  const [snack,setSnack] = useState(false)
  const location = useLocation();
  const { setHeader } = useHead();
  let deviceInfo;
  
    const onSubmitHandler = (event) => {
      event.preventDefault();
      postVal.config_obj = JSON.stringify(JSON.parse(deviceInfo))
      postVal.accessKey="";
      postVal.deviceType=1;
      postVal.lastModified="";
      postVal.objApiKey="";
      postVal.project_id=location.state.projectId;
      postVal.url="";
      postVal.organizationId=organizationId;
      postVal.userId=userId;
      postVal.userName="";
      console.log(postVal)
      axios.post(`/qfservice/mobileconfiguration/save.do`, postVal)
      .then((resp) => {
          resp?.data?.status === "SUCCESS" && setSnack(true)
          resp?.data?.status === "SUCCESS" &&
          navigate(-1, {
            state: { projectId: location?.state?.projectId },
          });
        });
    
  };
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,

        name: "Add Mobile Configuration",
      };
    });
  }, []);
  useEffect(() => {
    return () => {
      postVal = { ...initialval };
    };
  }, []);

  return (
    <>
       <form onSubmit={onSubmitHandler}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={2}>
          <label>Configure Name :  <span className="importantfield">*</span></label>
        </Grid>
        <Grid item xs={10}>
        <TextField
                id="outlined-basic"
                size="small"
                variant="outlined"
                type="text"
                name="name"
                required
                sx={{ width: 300 }}
                onChange={(e) => {postVal.name = e.target.value;}}
                InputLabelProps={{shrink: true,}}
              />
        </Grid>
        <Grid item xs={2}>
          <label>Platform :  <span className="importantfield">*</span></label>
        </Grid>
        <Grid item xs={10}>
        <Select
                sx={{ width: 150 }}
                name="plotform_type"
                required
                onChange={(e) => {postVal.plotform_type = e.target.value;}}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="1">Android</MenuItem>
                <MenuItem value="2">Ios</MenuItem>
              </Select>
        </Grid>
        <Grid item xs={2}>
          <label>Execution Environment :  <span className="importantfield">*</span> </label>
        </Grid>
        <Grid item xs={10}>
        <Select
                sx={{ width: 150 }}
                name="config_location"
                required
                onChange={(e) => {postVal.config_location = e.target.value;}}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={1}>Local</MenuItem>
                <MenuItem value={2}>Cloud</MenuItem>
              </Select>
        </Grid>
        <Grid item xs={2}>
          <label>Device Object Info :  <span className="importantfield">*</span> </label>
        </Grid>
        <Grid item xs={10}>
        <TextareaAutosize
                placeholder="Device Json obj"
                style={{ width: 400, height: 200,fontSize : "18px" }}
                name="config_obj"
                required
                onChange={(e) => {
                  deviceInfo = e.target.value
                  postVal.config_obj = e.target.value;
                }}
              />
        </Grid>
        <Grid>
          <Grid item xs={6}>
          <Button variant="contained" type="submit">
            Save
          </Button>
          </Grid>
        </Grid>
      </Grid>
      {snack && (
        <SnackbarNotify
          open={snack}
          close={setSnack}
          msg="Configurations added successfully"
          severity="success"
        />
      )}
      </form>
    </>
  );
};

export default AddConfigurationPopUp;
