import { Button, Grid } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { createApplication } from "../../Services/ApplicationService";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useSnackbar from "../../hooks/useSnackbar";
export let moduledata = {
  module_name: "",
  base_url: "",
  module_desc: "",
  is_deleted: false,
  module_type: 1,
  module_id: 0,
};
export function resetModuledata() {
  moduledata = {
    module_name: "",
    base_url: "",
    module_desc: "",
    is_deleted: false,
    module_type: 1,
    module_id: 0,
  };
}

export default function CreateApplication() {
  const { auth } = useAuth();
  const { setHeader } = useHead();
  const { setSnackbarData } = useSnackbar();
  const [selectedType, setSelectedType] = useState(1);
  let [snackbarerror, setSnackbarerror] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const refName = useRef(null);
  const refUrl = useRef(null);
  const refDesc = useRef(null);
  const APPLICATION_TYPES = [
    { value: 1, label: "API" },
    { value: 2, label: "Web" },
    { value: 3, label: "Mobile-Android" },
    { value: 4, label: "Mobile-iOS" },
    { value: 0, label: "Mobile-web" },
    { value: 19, label: "Link Project" },
  ];

  function submitHandler(e) {
    if (validateFormbyName(["appname", "url", "desc"], "error")) {
      console.log("valid form");
      createApplication(moduledata, auth.info.id).then((res) => {
        if (res) {
          resetModuledata();
          setSnackbarData({
            status: true,
            message: "New Application Created",
            severity: "success",
          });
          navigate("/Application/Recent");
        }
      });
    } else {
      console.log("Invalid form");
      setSnackbarerror(true);
    }
  }

  useEffect(() => {
    refName.current.value = moduledata?.module_name ?? "";
    refUrl.current.value = moduledata?.base_url ?? "";
    refDesc.current.value = moduledata?.module_desc ?? "";
    return () => {
      resetModuledata();
    };
  }, []);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: moduledata?.module_name
          ? moduledata?.module_name + " " + "Update Application"
          : "Create Application",
      };
    });
  }, []);

  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item md={4}>
          <Stack spacing={1}>
            <label>
              Application Type<span className="importantfield">*</span>
            </label>
            <select
              onChange={(e) => {
                moduledata.module_type = e.target.value;
                setSelectedType(e.target.value);
              }}
            >
              {APPLICATION_TYPES.map((appType) => {
                return (
                  <option
                    key={appType.value}
                    value={appType.value}
                    selected={appType.value == moduledata.module_type}
                  >
                    {appType.label}
                  </option>
                );
              })}
            </select>
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={1}>
            <label>
              Name<span className="importantfield">*</span>
            </label>
            <input
              type="text"
              name="appname"
              ref={refName}
              defaultValue={moduledata.module_name}
              onChange={(e) => {
                moduledata.module_name = e.target.value;
              }}
            />
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={1}>
            <label>
              {selectedType === "3"
                ? "APK-name"
                : selectedType === "4"
                ? "IOS file"
                : "URL"}
              <span className="importantfield">*</span>
            </label>
            <input
              type="text"
              name="url"
              ref={refUrl}
              defaultValue={moduledata.base_url}
              onChange={(e) => {
                moduledata.base_url = e.target.value;
              }}
              disabled={location?.pathname !== "/Application/Create"}
            />
          </Stack>
        </Grid>

        {/* {selectedType === "3" && (
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
        )} */}
        <Grid item md={12}>
          <Stack spacing={1}>
            <label>
              Description<span className="importantfield">*</span>
            </label>
            <input
              type="text"
              row="5"
              name="desc"
              ref={refDesc}
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
          Create & Continue
        </Button>
        <Button
          sx={{ color: "grey", textDecoration: "underline" }}
          onClick={() => navigate("/Application/Recent")}
        >
          Cancel
        </Button>
      </Stack>
      <SnackbarNotify
        open={snackbarerror}
        close={setSnackbarerror}
        msg={"Fill the mandatory fields"}
        severity="error"
      />
    </>
  );
}
