import { Button, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { Grid } from "@mui/material";
import axios from "axios";
import TextField from "@mui/material/TextField";
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
export let postValue = { ...initialValue };

function EditTestLinkProject() {
  console.log(postValue);
  const [reportEditSuccessMsg, setEditReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [reportExistingFailMsg, setReportExistingFailMsg] = useState(false);
  const { setHeader } = useHead();
  const navigate = useNavigate();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Edit Testset ",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmitHandler = (params) => {
    axios
      .post(
        `http://10.11.12.243:8083/qfservice/webtestset/createWebTestset`,
        postValue
      )
      .then((resp) => {
        if (resp?.data?.status === "SUCCESS") {
          setEditReportSuccessMsg(true);
          setTimeout(() => {
            setEditReportSuccessMsg(false);
          }, 3000);
          navigate(-1);
        } else if (resp?.data?.message === "Testset already exists.") {
          setReportExistingFailMsg(true);
          setTimeout(() => {
            setReportExistingFailMsg(false);
          }, 3000);
          navigate(-1);
        } else {
          setReportFailMsg(true);
          setTimeout(() => {
            setReportFailMsg(false);
          }, 3000);
          navigate(-1);
        }
      });
  };

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
            defaultValue={postValue.testset_name}
            onChange={(e) => {
              postValue.testset_name = "TS_" + e.target.value;
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
            defaultValue={postValue.testset_desc}
            sx={{ marginTop: "15px", width: 500 }}
            name="testset_desc"
            onChange={(e) => {
              postValue.testset_desc = e.target.value;
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
            defaultValue={postValue.cucumber_tags}
            name="cucumber_tags"
            style={{
              width: 500,
              height: 300,
              marginTop: "10px",
              padding: "10px",
            }}
            onChange={(e) => {
              postValue.cucumber_tags = e.target.value;
            }}
          />
        </Grid>
        <Grid container justifyContent="flex-end" justifyItems="center" mt={1}>
          <Grid xs={1.3}>
            <Button
              fullWidth
              variant="contained"
              type="submit"
              onClick={onSubmitHandler}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={reportEditSuccessMsg}
        close={setEditReportSuccessMsg}
        msg="Updated successfully"
        severity="success"
      />
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="Not Updated."
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

export default EditTestLinkProject;
