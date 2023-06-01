import { Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import {
  createApplication,
  getApplication,
} from "../../Services/ApplicationService";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

// Global module data -- create and update

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

// list of modules -- for duplicate checking
let moduleNames = [];

export default function CreateApplication() {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const { setHeader, setSnackbarData } = useHead();

  const refName = useRef(null);
  const refUrl = useRef(null);
  const refDesc = useRef(null);

  const [selectedType, setSelectedType] = useState(1);

  const APPLICATION_TYPES = [
    { value: 1, label: "API" },
    { value: 2, label: "Web" },
    { value: 3, label: "Mobile-Android" },
    { value: 4, label: "Mobile-iOS" },
    { value: 0, label: "Mobile-web" },
    { value: 19, label: "Link Project" },
  ];

  const submitHandler = (e) => {
    const isTaken = isModuleNameTaken(
      moduledata.module_id,
      moduledata.module_name
    );
    if (isTaken) {
      setSnackbarData({
        status: true,
        message: "Application name already exists!",
        severity: "error",
      });
      return;
    }
    if (validateFormbyName(["appname", "url", "desc"], "error")) {
      console.log("valid form");
      createApplication(moduledata, auth.info.id).then((res) => {
        resetModuledata();
        if (res == "Module Created Successfully") {
          setSnackbarData({
            status: true,
            message: "Application created successfully",
            severity: "success",
          });
          navigate("/Application/Recent");
        }
        if (res == "Module Updated Successfully") {
          setSnackbarData({
            status: true,
            message: "Application updated successfully",
            severity: "success",
          });
          navigate("/Application/Recent");
        }
      });
    } else {
      console.log("Invalid form");
      setSnackbarData({
        status: true,
        message: "Fill the mandatory fields",
        severity: "error",
      });
    }
  };

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

  useEffect(() => {
    getApplication((res) => {
      moduleNames = res.map(({ module_id, module_name, is_deleted }) => ({
        module_id,
        module_name,
        is_deleted,
      }));
    }, auth.info.id);
  }, []);

  const isModuleNameTaken = (moduleId, moduleName) => {
    const trimmedName = moduleName.trim().toLowerCase();;
    const taken = moduleNames.some(
      (module) => 
       module.module_id !== moduleId && 
       module.module_name.toLowerCase() === trimmedName && 
       module.is_deleted === false
    );
    return taken;
  };

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
              defaultValue={moduledata.module_type}
            >
              {APPLICATION_TYPES.map((appType) => {
                return (
                  <option key={appType.value} value={appType.value}>
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
                const isTaken = isModuleNameTaken(
                  moduledata.module_id,
                  moduledata.module_name
                );
                if (isTaken) {
                  setSnackbarData({
                    status: true,
                    message: "Application name already exists!",
                    severity: "error",
                  });
                }
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
    </>
  );
}
