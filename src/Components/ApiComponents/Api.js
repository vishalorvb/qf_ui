import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import ApiTabs from "./ApiTabs";
import { Apidata, resetApiData } from "./Data";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { createApiRequest, getApiDetails } from "../../Services/ApiService";
import useHead from "../../hooks/useHead";
import { authdata } from "./Data";
import { getApis } from "../../Services/ApiService";
import {  useLocation, useNavigate } from "react-router-dom";


function Api() {
  const { setHeader, setSnackbarData } = useHead();
  const location = useLocation();
  let navigate = useNavigate()
  let [apis, setApis] = useState([]);
  let namelist = ["apiname", "apidesc", "apiurl"];
  let apiNames = [];
  function handleSave(e) {
    const isTaken = isApiNameTaken(
      Apidata.api_name, apis
    );
    if (Apidata.api_id === undefined && isTaken.taken ) {
      setSnackbarData({
        status: true,
        message: "API name already exists!",
        severity: "error",
      });
      return;
    }
    if (Apidata.api_id === undefined && isTaken.hasSpecialCharacters) {
      setSnackbarData({
        status: true,
        message: "API name should not start with special characters!",
        severity: "error",
      });
      return;
    }
    if (validateFormbyName(namelist, "error")) {
      Apidata.auth.auth_data = JSON.stringify(authdata)
      createApiRequest(Apidata).then((res) => {

        if (res) {
          setSnackbarData({
            status: true,
            message: Apidata.api_id === undefined ? "API created successfully" : "API Updated successfully",
            severity: "success",
          });
          navigate(-1)
        }
      });
    } else {
      setSnackbarData({
        status: true,
        message: "Fill Requirded Field",
        severity: "error",
      });
    }
  }
  const isApiNameTaken = (apiName, apiNames) => {
    const trimmedName = apiName.trim().toLowerCase();
    const hasSpecialCharacters = /^[^a-zA-Z0-9]/.test(apiName);;
    const taken = apiNames.some(
      (api) =>
        api.api_name.trim().toLowerCase() === trimmedName
    );
    return { taken, hasSpecialCharacters };
  };
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create API",
        plusButton: false,
      };
    });
    return () => {
      resetApiData();
    };
  }, []);

  useEffect(() => {
    getApis((res) => {
      apiNames = res.map(({ api_id, api_name }) => ({ api_id, api_name }));
      setApis(apiNames)
    }, location.state?.application.module_id)
  }, [])

  return (
    <div
      style={{
        marginTop: "20px",
        marginLeft: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item md={1}>
          <Button onClick={handleSave} variant="contained">
        { Apidata.api_id === undefined ? "Save" : "Update"}
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={1}>
        <Grid item md={4}>
          <input
            type="text"
            style={{ width: "100%", height: "35px" }}
            placeholder="API Name"
            name="apiname"
            defaultValue={Apidata.api_name}
            disabled = {Apidata.api_id === undefined?false:true}
            onChange={(e) => {
              Apidata.api_name = e.target.value;
              const isTaken = isApiNameTaken(Apidata.api_name, apis);
              if (isTaken.taken) {
                setSnackbarData({
                  status: true,
                  message: "API name already exists!",
                  severity: "error",
                });
              }
              if (isTaken.hasSpecialCharacters) {
                setSnackbarData({
                  status: true,
                  message: "API name should not start with special characters!",
                  severity: "error",
                });
              }
            }}
          />
        </Grid>
        <Grid item md={8}>
          <input
            type="text"
            style={{ width: "100%", height: "35px" }}
            placeholder="Description"
            name="apidesc"
            defaultValue={Apidata.api_description}
            onChange={(e) => {
              Apidata.api_description = e.target.value;
            }}
          />
        </Grid>
        <Grid item md={2}>
          <select
            size="small"
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            fullWidth
            // defaultValue={Apidata.request_type}
            onChange={(e) => {
              Apidata.request_type = e.target.value;
            }}
          >
            <option
              selected={Apidata.request_type == 1 ? true : false}
              value={1}
            >
              Get
            </option>
            <option
              selected={Apidata.request_type == 2 ? true : false}
              value={2}
            >
              Post
            </option>
            <option
              selected={Apidata.request_type == 3 ? true : false}
              value={3}
            >
              Put
            </option>
            <option
              selected={Apidata.request_type == 4 ? true : false}
              value={4}
            >
              Delete
            </option>
          </select>
        </Grid>
        <Grid item md={4}>
          <input
            type="text"
            style={{ width: "100%", height: "35px" }}
            placeholder="URL"
            defaultValue={location.state?.application.base_url}
            disabled
            onChange={(e) => {
              Apidata.api_url = e.target.value;
            }}
          />
        </Grid>
        <Grid item md={6}>
          <input
            name="apiurl"
            defaultValue={Apidata.api_url}
            placeholder="Resource"
            onChange={(e) => {
              Apidata.api_url = e.target.value;
            }}
          />
        </Grid>
      </Grid>
      <ApiTabs></ApiTabs>
    </div>
  );
}

export default Api;
