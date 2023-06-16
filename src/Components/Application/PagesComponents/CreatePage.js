import { Button, MenuItem, Select } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import axios from "../../../api/axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import useAuth from "../../../hooks/useAuth";
import useHead from "../../../hooks/useHead";
import { useLocation } from "react-router-dom";

export default function CreatePage({ callGetPages }) {
  const { setHeader, header, setSnackbarData, setShowloader } = useHead();
  const { auth } = useAuth();
  const location = useLocation();

  const createPage = () => {
    setShowloader(true);
    axios
      .postForm(`/qfservice/webpages/LaunchJNLPToCreateWebPage`, {
        user_id: auth?.userId,
        module_id: location?.state?.module_id,
        web_page_url: location?.state?.base_url,
        user_name: auth?.user,
        mobile_os: "",
        diff_page_id: 0,
        browser_name: header?.browser,
      })
      .then((resp) => {
        console.log(resp?.data?.info);
        resp?.data?.status === "FAIL" && setShowloader(false);
        resp?.data?.status === "FAIL" &&
          setSnackbarData({
            status: true,
            message: "Somthing went wrong , Info Null",
            severity: "error",
          });
        resp?.data?.status === "SUCCESS" &&
          axios
            .postForm(`http://127.0.0.1:8765/connect`, {
              data: resp?.data?.info,
              jarName:
                location?.state?.module_type === 3 ? `mobile` : `webpage`,
            })
            .then((resp) => {
              console.log(resp);
              setSnackbarData({
                status: true,
                message: "Local Client Jar Launched!",
                severity: "success",
              });
              setShowloader(false);
            })
            .catch((err) => {
              console.log(err.message);
              err?.message === "Network Error" &&
                setSnackbarData({
                  status: true,
                  message: "Local Client Jar is not running!",
                  severity: "error",
                });
              setShowloader(false);
            });
      });
  };

  return (
    <Stack spacing={1} direction="row">
      <Button variant="contained" onClick={callGetPages}>
        <RefreshIcon />
      </Button>
      <Select
        id="Browser"
        value={header?.browser}
        size="small"
        onChange={(e) => {
          setHeader((ps) => {
            return { ...ps, browser: e?.target?.value };
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
  );
}
