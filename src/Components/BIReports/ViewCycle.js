import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
let list = []




export default function ViewCycle({selectedCycleList }) {

  // console.log(testsetData)
  // console.log(selectedCycleList.cycle_name)

  const [selectedCycleInfo, setSelectedCycleInfo] = useState([]);
  const [selectedCycleReports, setSelectedCycleReports] = useState([]);
  const [testsetName, setTestsetName] = useState();
  const [failedTestcases, setFailedTestcases] = useState([]);
  const [passedTestcases, setPassedTestcases] = useState();
  const [defectsTestcases, setDefectsTestcases] = useState();
  const [id,setId] = useState()
  const [formData, setFormData] = useState([]);
  const [reportData,setReportData] = useState([])
  const getCyclesReports = () => {
   
    axios.get("/Biservice/projects/93/cycles/17").then((resp) => {
      console.log(resp.data.info.selectedcycles);
      setSelectedCycleReports(resp?.data?.info?.selectedcycles);
      // setReportData(resp?.data?.info?.selectedcycles?.reports)
      (resp?.data?.info?.selectedcycles?.reports).forEach((r)=>
      {
        console.log(r)
        let temp ={}
        temp["id"] = r.id;
        temp["failed_testcases"]=r.failed_testcases;
        temp["passed_testcases"] = r.passed_testcases;
        temp["defects_testcases"] = r.defects_testcases
        // console.log(temp)
        list.push(temp)
      })
      console.log(list)
    });
  };
 
  useEffect(() => {
    setSelectedCycleInfo(selectedCycleList);
    getCyclesReports();
    
  }, [selectedCycleList])

 console.log(list)
console.log(failedTestcases)
console.log(selectedCycleReports)
console.log(reportData)
const handleInputChange = (id, fieldName, value) => {
  console.log(id)
  // setFormData(prevFormData => {
  //   const updatedFormData = [...prevFormData];
  //   if (updatedFormData[index]) {
  //     updatedFormData[index] = { ...updatedFormData[index], [fieldName]: value };
  //   } else {
  //     updatedFormData[index] = { [fieldName]: value };
  //   }
  //   return updatedFormData;
  // });
  list.forEach((r)=>
  {
    if(r.id == id)
    {
      r[fieldName] = value;
      r[fieldName]= value;
      r[fieldName] = value;
    }
    // finalData.push(r)
  })
  console.log(list)
};
const handleSubmit = (event) => {
  event.preventDefault();
  console.log(formData);
  // Here you can perform further actions with the formData
};
  return (
    <>
      <Grid item md={12}>
        <Typography variant="h4">Details</Typography>
      </Grid>
      <form  onSubmit={handleSubmit}>
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
              <Grid item md={2.5} >
                <input
                type="text"
                  defaultValue={testset.testset_name}
                  onChange={(e) => { setTestsetName(e.target.value) }}

                />
              </Grid>
              <Grid item md={1}>
                <input
                  defaultValue={testset.failed_testcases}
                  // onChange={(e) => { 
                  //   setFailedTestcases(e.target.value)
                    
                  // }}
                  onChange={(e) => {
                    console.log(testset)
                    handleInputChange(testset.id,'failed_testcases', e.target.value)}}
                />
              </Grid>

              <Grid item md={1}>
                <input
                  defaultValue={testset.passed_testcases}
                  // onChange={(e) => { setPassedTestcases(e.target.value) }}
                  onChange={(e) => handleInputChange(testset.id,'passed_testcases', e.target.value)}

                />
              </Grid>

              <Grid item md={1}>
                <input
                  defaultValue={testset.defects_testcases}
                  // onChange={(e) => { setDefectsTestcases(e.target.value) }}
                  onChange={(e) => handleInputChange(testset.id,'defects_testcases', e.target.value)}
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
