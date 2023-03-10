import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import axios from "../api/axios";
import { useEffect } from "react";
import { validateFormbyName } from "../CustomComponent/FormValidation";
import { createApplication } from "../Services/ApplicationService";
import useAuth from "../hooks/useAuth";
export let moduledata = {
  "module_name": "",
  "base_url": "",
  "module_desc": "",
  "is_deleted": false,
  "module_type": 0
}
export function resetModuledata() {
  moduledata = {
    "module_name": "",
    "base_url": "",
    "module_desc": "",
    "is_deleted": false,
    "module_type": 0
  }

}

export default function CreateApplication(props) {
  const { close, type, setMsg } = props;
  const { auth } = useAuth();
  function handleClose(e) {
    close(false);
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    baseUrl: yup.string().url().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    // console.log(data);
    // console.log(type);
    console.log({
      name: data.name,
      baseUrl: data.baseUrl,
      type: type,
      desc: data.description,
    });

    axios
      .post(`qfservice/saveApplicationDetails`, {
        application_id: "",
        application_name: data.name,
        application_desc: data.description,
        deleted: false,
        base_url: data.baseUrl,
        application_type: type,
        is_api_application: false,
        apk_name: "",
        bundle_id: "0",
        module_name: data.name,
        module_desc: data.description,
        module_type: type,
        parent_module_id: 0,
        sub_module_type: 0,
      })
      .then((resp) => {
        console.log(resp);
        resp.data.message === "success" && handleClose();
        setMsg(resp.data.message);
        reset();
      });
  };
  function submitHandler(e) {
    if (validateFormbyName(["appname", "url", "desc"], "error")) {
      console.log("valid form")
      createApplication(moduledata, auth.info.id).then(res => {
        if (res) {
          resetModuledata()
          close(false)
        }
      })
    }
    else {
      console.log("Invalid form")
    }
  }
  useEffect(() => {
    moduledata.module_type = type
  }, [])

  useEffect(() => {
    return () => {
      resetModuledata()
    }
  }, [])

  return (
    <div>

      <h4>This is cretae app pop up</h4>
      <Dialog open={true} >
        <DialogTitle className="dialogTitle">Create Application</DialogTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogContent className="dialogContent">
            <Grid container spacing={1}>
              <Grid item md={12}>
                <input type="text" name="appname"
                  placeholder="Application Name"
                  defaultValue={moduledata.module_name}
                  onChange={e => {
                    moduledata.module_name = e.target.value;
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <input type="text" name="url"
                  placeholder="URL"
                  defaultValue={moduledata.base_url}
                  onChange={e => {
                    moduledata.base_url = e.target.value;
                  }}
                />
              </Grid>
              <Grid item md={12}>
                <input type="text" name="desc"
                  placeholder="Description"
                  defaultValue={moduledata.module_desc}
                  onChange={e => {
                    moduledata.module_desc = e.target.value;
                  }}
                />
              </Grid>
              {type == 3 && <Grid item md={12}>
                <input type="text" name="apk_name"
                  placeholder="Apk Name"
                  defaultValue={moduledata.apk_name}
                  onChange={e => {
                    moduledata.apk_name = e.target.value;
                  }}
                />
              </Grid>}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button size="small" variant="contained" type="submit" onClick={submitHandler}>
              Save
            </Button>
            <Button size="small" variant="outlined" type="submit" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
