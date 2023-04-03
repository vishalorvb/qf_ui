import React from 'react'
import { Button, Grid, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState ,useEffect } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useLocation } from "react-router-dom";
import axios from '../../api/axios';
const UpdateConfigureDevice = () => {
  const [platformType, setPlatformType] = React.useState('');
  const [configName , setConfigName] = useState('');
  const [executionEnvironment,setExecutionEnvironment] = useState('');
  const [configDetails,setConfigDetails] = useState([]);
  const location = useLocation();
  const id = location.state.id;
  console.log(id)
  const handlePlatformTypeChange = (event) => {
    setPlatformType(event.target.value);
  };
  const handleExecutionEnvironmentChange = (event) => {
    setExecutionEnvironment(event.target.value);
  };
  useEffect(() => {
    axios.post(`/qfservice/mobileconfiguration/${id}/addDevices`).
        then((res) => {
  console.log(res?.data?.info?.model.saucelab)

      const details = res?.info;
      setConfigDetails(details);
      setConfigName(res?.data?.info?.model.saucelab.name)
      setPlatformType(res?.data?.info?.model.saucelab.deviceType)
      
    });
  }, []);

  return (
    <>
    <Grid container spacing={2}  justifyContent="center"
  alignItems="center" >
         <Grid item xs = {2} >
            <label>Configure Name :</label>
          </Grid>
        <Grid item xs = {10}>
           <TextField
            id="outlined-basic"
            // label="Configure Name"
            value={configName}
            size='small'
            variant="outlined"
            type="text"
            // ref={From_Date}
             defaultValue={configName}
             sx={{ width: 300 }}
            // onChange={(newValue) => {
            //   setFromDate(newValue.target.value);
            // }}
            InputLabelProps={{
              shrink: true,
            }}
          />
      </Grid>
  <Grid item xs={2}>
  <label>Platform : </label>
  </Grid>
  <Grid item xs={10} >
  <Select
          sx={{ width : 150}} 
          value={platformType}
          onChange={handlePlatformTypeChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Android</MenuItem>
          <MenuItem value={2}>Ios</MenuItem>
        </Select>
  </Grid>
  <Grid item xs={2}>
  <label>Execution Environment : </label>
  </Grid>
  <Grid item xs={10}>
  <Select
           sx={{ width : 150}} 
          value={executionEnvironment}
          onChange={handleExecutionEnvironmentChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Local</MenuItem>
          <MenuItem value={2}>Cloud</MenuItem>
        </Select>
  </Grid>
  <Grid item xs={2}>
  <label>Device Object Info : </label>
  </Grid>
  <Grid item xs={10}>
  <TextareaAutosize
  // aria-label="minimum height"
  // placeholder=""
  style={{ width: 400 , height : 200 }}
/>
  </Grid>
  <Grid>
  <Grid item xs={6}>
  <Button variant="contained" type="submit" style={{marginTop : "8px"}}>
            Update
          </Button>
</Grid>
  </Grid>
</Grid>
    </>
  )
}

export default UpdateConfigureDevice