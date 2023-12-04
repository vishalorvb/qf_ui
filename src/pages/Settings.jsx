import { Button, Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import useHead from "../hooks/useHead";
import {
  validateForm,
  resetClassName,
} from "../CustomComponent/FormValidation";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { qfservice } from "../Environment";
import axios from "axios";

function Settings() {
  let Url = useRef();
  let Uuid = useRef();
  const [uuid, setUuid] = useState("");
  const [url, setUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);

  const { auth } = useAuth();
  const organizationId = auth.info.organization_id;

  let requiredsFields = [Url, Uuid];

  const submit = () => {
    if (validateForm(requiredsFields, [], [], [], [], [], "error")) {
      var bodyFormData = new FormData();
      bodyFormData.append("report_portal_url", url.trim());
      bodyFormData.append("report_portal_uuid", uuid.trim());
      bodyFormData.append("organization_id", organizationId);

      axios({
        method: "post",
        url: `${qfservice}/updateOrganisationSettings`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <label>
                  URL <span className="importantfield">*</span>
                </label>
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
                <label>
                  UUID <span className="importantfield">*</span>
                </label>
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
