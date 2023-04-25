import { Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import useHead from '../hooks/useHead';
import useLogout from "../hooks/useLogout";
import { NumberValidation, validateForm, validateFormbyName } from '../CustomComponent/FormValidation';
import axios from '../api/axios';

let initialval = {
  firstName: "",
  lastName: "",
  company: "",
  adminUserId: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

let postVal = { ...initialval };



const AddOrganization = () => {

  const { setHeader } = useHead();
  const logout = useLogout();


  const onSubmitHandler = (params) => {
    console.log(postVal)
    if (validateFormbyName(["firstName", "lastName", "company", "email"], "error")) {
    }
    
// else if () {
//   console.log("Password is not same")
// }
else if (postVal.password === postVal.confirmPassword) {
        //   axios.post(`/qfuserservice/signup`, postVal)
        // .then((resp) => {
        //     console.log(resp)
        //   });
        console.log("Password is same")
      }
      else if(postVal.password !== postVal.confirmPassword)
      {
        console.log("Password is not same")
      }

    ;
  }

  

useEffect(() => {
  setHeader((ps) => {
    return {
      ...ps,
      name: "Add Organization",
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


return (
  <>
    <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            first Name</label>
          <input
            fullWidth
            size="small"
            name="firstName"
            onChange={(e) => { postVal.firstName = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            last Name</label>
          <input
            fullWidth
            size="small"
            name="lastName"
            onChange={(e) => { postVal.lastName = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Organization Name</label>
          <input
            fullWidth
            size="small"
            name="company"
            onChange={(e) => { postVal.company = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Admin User Id</label>
          <input
            fullWidth
            size="small"
            name="adminUserId"
            onChange={(e) => { postVal.adminUserId = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Admin Email</label>
          <input
            fullWidth
            type='email'
            size="small"
            name="email"
            onChange={(e) => { postVal.email = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Phone Number</label>
          <input
            fullWidth
            type='number'
            size="small"
            name="phone"
            onChange={(e) => { postVal.phone = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Password</label>
          <input
            fullWidth
            size="small"
            type='password'
            name="password"
            onChange={(e) => { postVal.password = e.target.value; }}

          />
        </Stack>
      </Grid>
      <Grid item md={4}>
        <Stack spacing={0.5}>
          <label>
            Confirm Password</label>
          <input
            fullWidth
            size="small"
            type='password'
            name="confirmPassword"
            onChange={(e) => { postVal.confirmPassword = e.target.value; }}

          />
        </Stack>
      </Grid>
    </Grid>
    <Grid container justifyContent="flex-end" alignItems="center" mt={2}>
      <Grid item md={1.5}>
        <Button fullWidth variant="contained"
          onClick={onSubmitHandler}
          style={{ backgroundColor: "#009fee" }}
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  </>
  /* <Grid container justifyContent="center" mb={1}>
    <Grid item md={8}>
      <h3 
            style={{color: "#009fee" }}
      
      >Create your Account</h3>
    </Grid>
  </Grid> */
  /* <Stack spacing={1} maxWidth="50%" >
        <Stack spacing={1} direction="row">
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Admin First Name"
                name="firstName"
                onChange={(e) => {postVal.firstName = e.target.value;}}

              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Admin Last Name"
                name="lastName"
                onChange={(e) => {postVal.lastName = e.target.value;}}

              />
        </Stack>
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Organization Name"
                name='company'
                onChange={(e) => {postVal.company = e.target.value;}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BusinessIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Admin User Id"
                name='adminUserId'
                onChange={(e) => {postVal.adminUserId = e.target.value;}}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Admin Email"
                name='email'
                onChange={(e) => {postVal.email = e.target.value;}}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                placeholder="Phone Number"
                name='phone'
                onChange={(e) => {postVal.phone = e.target.value;}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CallIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                type='password'
                placeholder="Password"
                name='password'
                onChange={(e) => {postVal.password = e.target.value;}}

                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                size="small"
                id="outlined-basic"
                variant="outlined"
                type='password'
                placeholder="Confirm Password"
                name='confirmPassword'
                onChange={(e) => {postVal.confirmPassword = e.target.value;}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                      <Divider orientation='vertical' />
                    </InputAdornment>
                  ),
                }}
              />
    </Stack>
      <Grid container justifyContent="space-between" mt={2} alignItems="center"> 
        <Grid item md={3}>
       <h4  style={{ color: "#596981" , cursor:"pointer"}}>
        Already have account please 
        <span  style={{ color: "#009fee" }} 
       onClick={() => logout()}
       > Login</span>
       </h4>

        </Grid>
        <Grid item md={2}>
        <Button fullWidth variant="contained"
               onClick={onSubmitHandler}
                style={{ backgroundColor: "#009fee" }}
              >
                Sign Up
              </Button>

        </Grid>

      </Grid> */
)
}

export default AddOrganization