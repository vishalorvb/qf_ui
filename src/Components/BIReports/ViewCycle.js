import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
let list = [];

export default function ViewCycle({ selectedCycleList }) {
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [selectedCycleInfo, setSelectedCycleInfo] = useState([]);
  const [selectedCycleReports, setSelectedCycleReports] = useState([]);

  const getCyclesReports = () => {
    axios
      .get(
        `/Biservice/projects/${selectedCycleReports?.project_id}/cycles/${selectedCycleReports?.cycle_id}`
      )
      .then((resp) => {
        // console.log(resp.data.info.selectedcycles);
        setSelectedCycleReports(resp?.data?.info?.selectedcycles);
        // setReportData(resp?.data?.info?.selectedcycles?.reports)
        (resp?.data?.info?.selectedcycles?.reports).forEach((r) => {
          // console.log(r)
          let temp = {};
          temp["id"] = r.id;
          temp["failed_testcases"] = r.failed_testcases;
          temp["passed_testcases"] = r.passed_testcases;
          temp["defects_testcases"] = r.defects_testcases;
          // console.log(temp)
          list.push(temp);
        });
        // console.log(list)
      });
  };

  useEffect(() => {
    setSelectedCycleInfo(selectedCycleList);
    getCyclesReports();
  }, [selectedCycleList]);

  //  console.log(list)
  // console.log(selectedCycleReports)
  // console.log(reportData)
  // console.log(selectedCycleInfo)

  const handleInputChange = (id, fieldName, value) => {
    list.forEach((r) => {
      if (r.id == id) {
        r[fieldName] = value;
        r[fieldName] = value;
        r[fieldName] = value;
      }
      // finalData.push(r)
    });
    // console.log(list)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      cycle_name: selectedCycleReports?.cycle_name,
      cycle_id: selectedCycleReports?.cycle_id,
      reports: list,
    };
    // console.log(data);

    // Here you can perform further actions with the formData
    axios.post(`/Biservice/projects/cycles/update`, data).then((resp) => {
      // console.log(resp)
      if (resp.data.message == "Succesfully Updated Results") {
        setAddSuccessMsg(true);
        getCyclesReports();
        setTimeout(() => {
          setAddSuccessMsg(false);
        }, 3000);
      }
    });
  };
  return (
    <>
      <Grid item md={12} mt={2}>
        <Typography variant="h4">Details</Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} mt={1}>
          <lable>Cycle Name :</lable>
          <input defaultValue={selectedCycleInfo?.cycle_name} />
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item md={2.4}>
              <lable>Testset Name :</lable>
            </Grid>
            <Grid item md={1}>
              <lable>Fail Count :</lable>
            </Grid>
            <Grid item md={1}>
              <lable>Pass Count :</lable>
            </Grid>
            <Grid item md={1.2}>
              <lable>Defect Count :</lable>
            </Grid>

            {selectedCycleReports?.reports?.map((testset) => (
              <Grid
                container
                direction="row"
                spacing={1}
                alignItems="center"
                mt={0.5}
              >
                <Grid item md={2.5}>
                  <input
                    type="text"
                    readOnly
                    defaultValue={testset.testset_name}
                  />
                </Grid>
                <Grid item md={1}>
                  <input
                    defaultValue={testset.failed_testcases}
                    onChange={(e) => {
                      // console.log(testset)
                      handleInputChange(
                        testset.id,
                        "failed_testcases",
                        e.target.value
                      );
                    }}
                  />
                </Grid>

                <Grid item md={1}>
                  <input
                    defaultValue={testset.passed_testcases}
                    onChange={(e) =>
                      handleInputChange(
                        testset.id,
                        "passed_testcases",
                        e.target.value
                      )
                    }
                  />
                </Grid>

                <Grid item md={1}>
                  <input
                    defaultValue={testset.defects_testcases}
                    onChange={(e) =>
                      handleInputChange(
                        testset.id,
                        "defects_testcases",
                        e.target.value
                      )
                    }
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg={"Updated Successfully"}
        severity="success"
      />
    </>
  );
}
