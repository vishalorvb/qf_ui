import React from 'react'
import { Button, Grid, Tooltip, Dialog, DialogActions,DialogContent,DialogTitle, } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const AddConfigurationPopUp = (props) => {
  const { open, close, setSnack } =props;
  const [platformType, setPlatformType] = useState('');
  const schema = yup.object().shape({ testcaseName: yup.string().required() });
  const handleChange = (event) => {
    setPlatformType(event.target.value);
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    reset();
    close(false);
  };
  const onSubmitHandler = (params) =>
  {

  }
  return (
    <>
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="dialogTitle"> Add Configuration</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent>
        <Grid container spacing={2} >
         <Grid item xs = {2} >
            <label>Configure Name :</label>
          </Grid>
        <Grid item xs = {10}>
           <TextField
            id="outlined-basic"
            size='small'
            variant="outlined"
            type="text"
            // ref={From_Date}
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
          onChange={handleChange}
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
          value={platformType}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Android</MenuItem>
          <MenuItem value={2}>Ios</MenuItem>
        </Select>
  </Grid>
  <Grid item xs={2}>
  <label>Device Object Info : </label>
  </Grid>
  <Grid item xs={10}>
  <TextareaAutosize style={{ width: 400 , height : 200 }}/>
  </Grid>
</Grid>
        </DialogContent>
        <DialogActions style={{alignItems:"center" , justifyContent:"center"}}>
          <Button variant="contained" type="submit" >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
    </>
  )
}

export default AddConfigurationPopUp