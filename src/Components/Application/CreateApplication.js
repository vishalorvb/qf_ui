import { Button, Grid } from "@mui/material";

import { useEffect } from "react";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { createApplication } from "../../Services/ApplicationService";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
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
  const { setHeader } = useHead();

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
  }, [type]);

  useEffect(() => {
    return () => {
      resetModuledata();
    };
  }, []);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Application",
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
        };
      });
  }, []);

  return (
    <div>
      <Grid container spacing={5}>
        <Grid item>
          <label>Name</label>
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
        <Grid item>
          <label>URL</label>
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
        <Grid item>
          <label>Application Type</label>
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
        {type === 3 && (
          <Grid item>
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
        <Grid item md={12}>
          <label>Description</label>
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
      </Grid>
      <Button
        size="small"
        variant="contained"
        type="submit"
        onClick={submitHandler}
      >
        Save
      </Button>
    </div>
  );
}
