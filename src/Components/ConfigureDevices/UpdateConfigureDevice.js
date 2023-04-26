import React from "react";
import {
  Button,
  Grid
} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

const UpdateConfigureDevice = () => {
  const [platformType, setPlatformType] = React.useState("");
  const [configName, setConfigName] = useState("");
  const [executionEnvironment, setExecutionEnvironment] = useState("");
  const [configObjInfo, setConfigObjInfo] = useState("");
  const [configDetails, setConfigDetails] = useState([]);
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const schema = yup.object().shape({ testcaseName: yup.string().required() });
  const [snack, setSnack] = useState(false);

  // try {
  //     specificationId
  //     projectId
  // } catch (error) {
  //   navigate("/TestcaseExecution/ConfigureDevice")
  // }

  const organizationId = auth.info.organization_id;
  const userId = auth.info.id;

  const {
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    axios
      .post(`/qfservice/mobileconfiguration/${location.state.id}/addDevices`)
      .then((res) => {
        console.log(res?.data?.info?.model.saucelab);
        console.log(res?.data?.info?.model.saucelab);

        const details = res?.info;
        setConfigDetails(details);
        setConfigName(res?.data?.info?.model.saucelab.name);
        setExecutionEnvironment(
          res?.data?.info?.model.saucelab.config_location
        );
        setPlatformType(res?.data?.info?.model.saucelab.plotform_type);
        setConfigObjInfo(res?.data?.info?.model.saucelab.config_obj);
      });
  }, []);

  function handleUpdate() {
    const postValues = {
      specificationId: location.state.id,
      name: configName,
      url: "",
      organizationId: organizationId,
      userId: userId,
      lastModified: "",
      objApiKey: "",
      deviceType: 1,
      userName: "",
      accessKey: "",
      project_id: location.state.projectId,
      config_location: executionEnvironment,
      config_obj: configObjInfo,
      plotform_type: platformType,
    };
    axios
      .post(
        `/qfservice/mobileconfiguration/${location.state.id}/update.do`,
        postValues
      )
      .then((resp) => {
        console.log(resp);
        resp?.data?.status === "SUCCESS" && setSnack(true);
        resp?.data?.status === "SUCCESS" &&
          navigate(-1, {
            state: { projectId: location.state.projectId },
          });
      });
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={2}>
          <label>Configure Name :</label>
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="outlined-basic"
            value={configName}
            size="small"
            variant="outlined"
            type="text"
            defaultValue={configName}
            sx={{ width: 300 }}
            onChange={(e) => {
              setConfigName(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <label>Platform : </label>
        </Grid>
        <Grid item xs={10}>
          <Select
            sx={{ width: 150 }}
            value={platformType}
            onChange={(e) => {
              setPlatformType(e.target.value);
            }}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={1}>Android</MenuItem>
            <MenuItem value={2}>Ios</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={2}>
          <label>Execution Environment : </label>
        </Grid>
        <Grid item xs={10}>
          <Select
            sx={{ width: 150 }}
            value={executionEnvironment}
            onChange={(e) => {
              setExecutionEnvironment(e.target.value);
            }}
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
            value={configObjInfo}
            onChange={(e) => {
              setConfigObjInfo(e.target.value);
            }}
            style={{ width: 400, height: 200,fontSize : "18px"  }}
          />
        </Grid>
        <Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "8px" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {snack && (
        <SnackbarNotify
          open={snack}
          close={setSnack}
          msg="Configurations updated successfully"
          severity="success"
        />
      )}
    </>
  );
};

export default UpdateConfigureDevice;
