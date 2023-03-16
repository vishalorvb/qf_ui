import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";

import { useEffect } from "react";
import { validateFormbyName } from "../CustomComponent/FormValidation";
import { createApplication } from "../Services/ApplicationService";
import useAuth from "../hooks/useAuth";
export let moduledata = {
  module_name: "",
  base_url: "",
  module_desc: "",
  is_deleted: false,
  module_type: 0,
};
export function resetModuledata() {
  moduledata = {
    module_name: "",
    base_url: "",
    module_desc: "",
    is_deleted: false,
    module_type: 0,
  };
}

export default function CreateApplication(props) {
  const { close, type, handleSnackbar } = props;
  const { auth } = useAuth();

  function handleClose(e) {
    close(false);
  }

  function submitHandler(e) {
    if (validateFormbyName(["appname", "url", "desc", "apk_name"], "error")) {
      console.log("valid form");
      createApplication(moduledata, auth.info.id).then((res) => {
        if (res) {
          resetModuledata();
          handleSnackbar();
          close(false);
        }
      });
    } else {
      console.log("Invalid form");
    }
  }
  useEffect(() => {
    moduledata.module_type = type;
  }, []);

  useEffect(() => {
    return () => {
      resetModuledata();
    };
  }, []);

  return (
    <div>
      <Dialog open={true}>
        <DialogTitle className="dialogTitle">Create Application</DialogTitle>
        <DialogContent className="dialogContent">
          <Grid container spacing={1}>
            <Grid item md={12}>
              <input
                type="text"
                name="appname"
                placeholder="Application Name"
                defaultValue={moduledata.module_name}
                onChange={(e) => {
                  moduledata.module_name = e.target.value;
                }}
              />
            </Grid>
            <Grid item md={12}>
              <input
                type="text"
                name="url"
                placeholder="URL"
                defaultValue={moduledata.base_url}
                onChange={(e) => {
                  moduledata.base_url = e.target.value;
                }}
              />
            </Grid>
            <Grid item md={12}>
              <input
                type="text"
                name="desc"
                placeholder="Description"
                defaultValue={moduledata.module_desc}
                onChange={(e) => {
                  moduledata.module_desc = e.target.value;
                }}
              />
            </Grid>
            {type == 3 && (
              <Grid item md={12}>
                <input
                  type="text"
                  name="apk_name"
                  placeholder="Apk Name"
                  defaultValue={moduledata.apk_name}
                  onChange={(e) => {
                    moduledata.apk_name = e.target.value;
                  }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            variant="contained"
            type="submit"
            onClick={submitHandler}
          >
            Save
          </Button>
          <Button
            size="small"
            variant="outlined"
            type="submit"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
