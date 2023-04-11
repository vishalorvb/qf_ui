import { Button, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import UpgradeSharpIcon from "@mui/icons-material/UpgradeSharp";
import useHead from "../hooks/useHead";
import { baseUrl } from "../Environment";
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  validateForm,
  resetClassName,
} from "../CustomComponent/FormValidation";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
// import Table from '../../Table';
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

function Settings() {
  let Url = useRef();
  let Uuid = useRef();
  const [uuid, setUuid] = useState("");
  const [url, setUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const axiosPrivate = useAxios();
  const { auth } = useAuth();
  console.log(auth.info);
  const organizationId = auth.info.organization_id;

  let requiredsFields = [Url, Uuid];

  const submit = () => {
    if (validateForm(requiredsFields, [], [], [], [], [], "error")) {
      var bodyFormData = new FormData();
      bodyFormData.append("report_portal_url", url.trim());
      bodyFormData.append("report_portal_uuid", uuid.trim());
      bodyFormData.append("organization_id", organizationId);

      axiosPrivate({
        method: "post",
        url: `/qfservice/updateOrganisationSettings`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        if (response.data) {
          console.log(response);
          setSuccessMsg(true);
          setTimeout(() => {
            setSuccessMsg(false);
          }, 3000);
        }
      });
      setUrl("");
      setUuid("");
    } else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false);
      }, 2000);
    }
  };

  const { setHeader } = useHead();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Admin Organisation Settings",
      };
    });
  }, []);

  return (
    <div onClick={resetClassName}>
      <Paper
        elevation={0}
        sx={{ padding: "2px", marginTop: "4px", marginBottom: "10px" }}
      >
        <SnackbarNotify
          open={successMsg}
          close={setSuccessMsg}
          msg="Details are updated Successfully"
          severity="success"
        />
        <SnackbarNotify
          open={validationMsg}
          close={setValidationMsg}
          msg="Fill all the required fields"
          severity="error"
        />
        <div className="datatable" style={{ marginTop: "15px" }}>
          <Grid container direction="row" spacing={2}>
            <Grid item md={12}>
              <Stack spacing={1}>
                <label>URL</label>
                <input
                  type="text"
                  name=""
                  value={url}
                  ref={Url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item md={12}>
              <Stack spacing={1}>
                <label>UUID</label>
                <input
                  type="text"
                  name=""
                  value={uuid}
                  ref={Uuid}
                  onChange={(e) => setUuid(e.target.value)}
                />
              </Stack>
            </Grid>
          </Grid>
          <Stack mt={2} spacing={2} direction="row-reverse">
            <Button variant="contained" type="submit" onClick={submit}>
              Update
            </Button>
          </Stack>
        </div>
      </Paper>
    </div>
  );
}

export default Settings;
