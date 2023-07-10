import { Button, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Grid } from "@mui/material";
import axios from "../../api/axios";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useHead from "../../hooks/useHead";

let initialValue = {
  testset_id: 0,
  testset_name: "",
  testset_desc: "",
  module_id: "",
  runtime_variables: "",
  cucumber_tags: "",
  project_id: "",
  testcases_list: [],
};
export let postVal = { ...initialValue };

function AddTestSetLinkProject() {
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [reportExistingFailMsg, setReportExistingFailMsg] = useState(false);
  const location = useLocation();
  const { setHeader } = useHead();

  const navigate = useNavigate();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Testset ",
      };
    });
    // return () => {
    //   setHeader((ps) => {
    //     return {
    //       ...ps,
    //       name: "Testset Execution",
    //     };
    //   });
    // }
  }, []);
  const onSubmitHandler = (params) => {
    {
      postVal.module_id = location.state?.applicationId;
      postVal.project_id = location.state?.projectId;
      axios
        .post(`/qfservice/webtestset/createWebTestset`, postVal)
        .then((resp) => {
          if (resp?.data?.status === "SUCCESS") {
            setReportSuccessMsg(true);
            setTimeout(() => {
              setReportSuccessMsg(false);
              // getBuilEnvironment();
            }, 3000);
            navigate(-1);
          } else if (resp?.data?.message == "Testset already exists.") {
            setReportExistingFailMsg(true);
            setTimeout(() => {
              setReportExistingFailMsg(false);
            }, 3000);
          } else {
            setReportFailMsg(true);
            setTimeout(() => {
              setReportFailMsg(false);
            }, 3000);
          }
        });
    }
  };
  useEffect(() => {
    return () => {
      postVal = { ...initialValue };
    };
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        justifyContent="flex-start"
        justifyItems="center"
        sx={{ marginTop: "5px" }}
      >
        <Grid xs={2} sx={{ marginTop: "15px" }}>
          {" "}
          Name{" "}
        </Grid>

        <Grid xs={9}>
          {" "}
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            placeholder="testset_name"
            sx={{ width: 500 }}
            name="testset_name"
            // defaultValue={"testset_name"}
            onChange={(e) => {
              postVal.testset_name = "TS_" + e.target.value;
            }}
          />
        </Grid>
        <Grid xs={2} sx={{ marginTop: "30px" }}>
          {" "}
          Description{" "}
        </Grid>

        <Grid xs={9}>
          {" "}
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            placeholder="Description"
            // defaultValue={"testset_desc"}
            sx={{ marginTop: "15px", width: 500 }}
            name="testset_desc"
            onChange={(e) => {
              postVal.testset_desc = e.target.value;
            }}
          />
        </Grid>
        <Grid xs={2} sx={{ marginTop: "30px" }}>
          {" "}
          Command{" "}
        </Grid>
        <Grid xs={9}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={5}
            placeholder="Command"
            name="cucumber_tags"
            style={{
              width: 500,
              height: 300,
              marginTop: "10px",
              padding: "10px",
            }}
            onChange={(e) => {
              postVal.cucumber_tags = e.target.value;
            }}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" justifyItems="center" mt={1}>
        <Grid xs={1.3}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={onSubmitHandler}
          >
            Create & Continue
          </Button>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="Created successfully"
        severity="success"
      />
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No Created."
        severity="error"
      />
      <SnackbarNotify
        open={reportExistingFailMsg}
        close={setReportExistingFailMsg}
        msg="Testset already exists."
        severity="error"
      />
    </>
  );
}

export default AddTestSetLinkProject;
