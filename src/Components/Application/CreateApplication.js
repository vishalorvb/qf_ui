import { Button, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { createApplication } from "../../Services/ApplicationService";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
export let moduledata = {
  module_name: "",
  base_url: "",
  module_desc: "",
  is_deleted: false,
  module_type: 1,
};
export function resetModuledata() {
  moduledata = {
    module_name: "",
    base_url: "",
    module_desc: "",
    is_deleted: false,
    module_type: 1,
  };
}

export default function CreateApplication() {
  const { auth } = useAuth();
  const { setHeader } = useHead();
  const [selectedType, setSelectedType] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const APPLICATION_TYPES = [
    { value: 1, label: "API" },
    { value: 2, label: "Web" },
    { value: 3, label: "Mobile-Android" },
    { value: 4, label: "Mobile-iOS" },
    { value: 5, label: "Python BDD" },
    { value: 6, label: "Test Design" },
    { value: 7, label: "PT" },
    { value: 8, label: "Security" },
  ];

  function submitHandler(e) {
    if (validateFormbyName(["appname", "url", "desc", "apk_name"], "error")) {
      console.log("valid form");
      createApplication(moduledata, auth.info.id).then((res) => {
        if (res) {
          resetModuledata();
          navigate("/Application");
        }
      });
    } else {
      console.log("Invalid form");
    }
  }

  // useEffect(() => {
  //   return () => {
  //     resetModuledata();
  //   };
  // }, [applicationEditData]);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Application",
      };
    });
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item md={selectedType === "3" ? 3 : 4}>
          <Stack spacing={1}>
            <label>Name </label>
            <input
              type="text"
              name="appname"
              defaultValue={moduledata.module_name}
              onChange={(e) => {
                moduledata.module_name = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={selectedType === "3" ? 3 : 4}>
          <Stack spacing={1}>
            <label>URL</label>
            <input
              type="text"
              name="url"
              defaultValue={moduledata.base_url}
              onChange={(e) => {
                moduledata.base_url = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={selectedType === "3" ? 3 : 4}>
          <Stack spacing={1}>
            <label>Application Type</label>
            <select
              onChange={(e) => {
                moduledata.module_type = e.target.value;
                setSelectedType(e.target.value);
              }}
            >
              {APPLICATION_TYPES.map((appType) => {
                return <option value={appType.value}>{appType.label}</option>;
              })}
            </select>
          </Stack>
        </Grid>
        {selectedType === "3" && (
          <Grid item md={3}>
            <Stack spacing={1}>
              <label>APK</label>
              <input
                type="text"
                name="apk_name"
                placeholder="Apk Name"
                defaultValue={moduledata.apk_name}
                onChange={(e) => {
                  moduledata.apk_name = e.target.value;
                }}
              />
            </Stack>
          </Grid>
        )}
        <Grid item md={12}>
          <Stack spacing={1}>
            <label>Description</label>
            <input
              type="text"
              row="5"
              name="desc"
              defaultValue={moduledata.module_desc}
              onChange={(e) => {
                moduledata.module_desc = e.target.value;
              }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={2} spacing={2} direction="row-reverse">
        <Button variant="contained" type="submit" onClick={submitHandler}>
          Save & Continue
        </Button>
        <Button
          sx={{ color: "grey", textDecoration: "underline" }}
          onClick={() => navigate("/Application")}
        >
          Cancel
        </Button>
      </Stack>
    </>
  );
}
