import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import ApiTabs from "./ApiTabs";
import { Apidata, resetApiData } from "./Data";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { createApiRequest } from "../../Services/ApiService";
import useHead from "../../hooks/useHead";
import { authdata } from "./Data";


function Api() {
  const { setHeader } = useHead();
  let namelist = ["apiname", "apidesc", "apiurl", "resource"];
  let [snackbarsuccess, setSnackbarsuccess] = useState(false);
  let navigate = useNavigate();

  function handleSave(e) {
    if (validateFormbyName(namelist, "error")) {
      Apidata.auth.authtype = authdata
      console.log(Apidata)
      createApiRequest(Apidata).then((res) => {
        if (res) {
          setSnackbarsuccess(true);
          setTimeout(() => {
            navigate(-1)
          }, 1000);
        }
      });
    } else {
      console.log("requird field");
    }
  }
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
  return (
    <div
      style={{
        marginTop: "20px",
        marginLeft: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <SnackbarNotify
        open={snackbarsuccess}
        close={setSnackbarsuccess}
        msg="Saved Succesfully"
        severity="success"
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
      >
        <Grid item md={1}>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </Grid>
      </Grid>
      <br/>
      <Grid container spacing={1}>
        <Grid item md={4}>
          <input
            type="text"
            style={{ width: "100%", height: "35px" }}
            placeholder="API Name"
            name="apiname"
            defaultValue={Apidata.api_name}
            onChange={(e) => {
              Apidata.api_name = e.target.value;
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
              console.log("caling api description");
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
            name="apiurl"
            defaultValue={Apidata.api_url}
            onChange={(e) => {
              Apidata.api_url = e.target.value;
            }}
          />
        </Grid>
        <Grid item md={6}>
          <input placeholder="Resource" name="resource" />
        </Grid>
      </Grid>
      <ApiTabs></ApiTabs>
    </div>
  );
}

export default Api;
