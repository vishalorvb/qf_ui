import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";




export default function ViewCycle({selectedCycleList }) {

  // console.log(testsetData)
  // console.log(selectedCycleList.cycle_name)

  const [selectedCycleInfo, setSelectedCycleInfo] = useState([]);
  const [selectedCycleReports, setSelectedCycleReports] = useState([]);
  const [testsetName, setTestsetName] = useState();
  const [failedTestcases, setFailedTestcases] = useState([]);
  const [passedTestcases, setPassedTestcases] = useState();
  const [defectsTestcases, setDefectsTestcases] = useState();


  
  
  
  




  const getCyclesReports = () => {
    axios.get("/Biservice/projects/93/cycles/17").then((resp) => {
      console.log(resp.data.info.selectedcycles);
      setSelectedCycleReports(resp?.data?.info?.selectedcycles);
    });
  };



 




  useEffect(() => {
    setSelectedCycleInfo(selectedCycleList);
    getCyclesReports();
  }, [selectedCycleList])

 
console.log(failedTestcases)

  return (
    <>
      <Grid item md={12}>
        <Typography variant="h4">Details</Typography>
      </Grid>
      <form  >
        <Stack spacing={1} mt={1}>
          <lable>Cycle Name :</lable>
          <input
            defaultValue={selectedCycleInfo?.cycle_name}
          />
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
            <Grid container direction="row" spacing={1} alignItems="center" mt={0.5}>
              <Grid item md={2.5}>
                <input
                type="text"
                  defaultValue={testset.testset_name}
                  onChange={(e) => { setTestsetName(e.target.value) }}

                />
              </Grid>
              <Grid item md={1}>
                <input
                  defaultValue={testset.failed_testcases}
                  onChange={(e) => { }}
                />
              </Grid>

              <Grid item md={1}>
                <input
                  defaultValue={testset.passed_testcases}
                  onChange={(e) => { setPassedTestcases(e.target.value) }}

                />
              </Grid>

              <Grid item md={1}>
                <input
                  defaultValue={testset.defects_testcases}
                  onChange={(e) => { setDefectsTestcases(e.target.value) }}

                />
              </Grid>
            </Grid> 
          ))}
            </Grid>

          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained"  >
              Update
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  )

}
