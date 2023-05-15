import { useLocation } from "react-router-dom";
import PagesTable from "../PagesTable";
import useAuth from "../../../hooks/useAuth";
import useHead from "../../../hooks/useHead";
import axios from "../../../api/axios";
import { useEffect, useState } from "react";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { Button, MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import BackdropLoader from "../../../CustomComponent/BackdropLoader";

export default function Pages({ location }) {
  const { setHeader, header } = useHead();
  const { auth } = useAuth();
  // const location = useLocation();
  console.log(location?.state?.module_type);
  const [clientInactive, setClientInactive] = useState(false);
  const [jarConnected, setJarConnected] = useState(false);
  const [remoteAPiFails, setRemoteAPiFails] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const createPage = () => {
    console.log(header?.browser);
    setShowLoading(true);
    axios
      .postForm(`/qfservice/webpages/LaunchJNLPToCreateWebPage`, {
        user_id: auth?.userId,
        module_id: location?.state?.module_id,
        web_page_url: location.state.base_url,
        user_name: auth?.user,
        mobile_os: "",
        diff_page_id: 0,
        browser_name: header?.browser,
      })
      .then((resp) => {
        console.log(resp?.data?.info);
        resp?.data?.status === "FAIL" && setRemoteAPiFails(true);
        resp?.data?.status === "SUCCESS" &&
          axios
            .postForm(`http://127.0.0.1:8765/connect`, {
              data: resp?.data?.info,
              jarName:
                location?.state?.module_type === 3 ? `mobile` : `webpage`,
            })
            .then((resp) => {
              console.log(resp);
              setJarConnected(true);
              setShowLoading(false);
            })
            .catch((err) => {
              console.log(err.message);
              err.message === "Network Error" && setClientInactive(true);
              setShowLoading(false);
            });
      });
  };

  return (
    <>
      <SnackbarNotify
        open={clientInactive}
        close={setClientInactive}
        msg={"Local Client Jar is not running!"}
        severity="error"
      />
      <SnackbarNotify
        open={remoteAPiFails}
        close={setRemoteAPiFails}
        msg={"Somthing went wrong , Info Null "}
        severity="error"
      />
      <SnackbarNotify
        open={jarConnected}
        close={setJarConnected}
        msg={"Local Client Jar Launched!"}
        severity="success"
      />

      <div className="apptable">
        <div className="intable">
          <div style={{ float: "right" }}>
            <Stack spacing={1} direction="row">
              <Select
                id="Browser"
                value={header?.browser}
                size="small"
                onChange={(e) => {
                  setHeader((ps) => {
                    return { ...ps, browser: e.target.value };
                  });
                }}
              >
                <MenuItem value={"custom"}>Custom</MenuItem>
                <MenuItem value={"chrome"}>Chrome</MenuItem>
                <MenuItem value={"mozilla"}>Mozilla</MenuItem>
              </Select>
              <Button variant="contained" onClick={createPage}>
                Create Page
              </Button>
            </Stack>
          </div>
        </div>
        <PagesTable location={location} />
        <BackdropLoader open={showLoading} />
      </div>
    </>
  );
}
