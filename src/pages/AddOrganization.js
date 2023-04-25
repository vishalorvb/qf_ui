import { Button, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import useHead from '../hooks/useHead';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from '../api/axios';
import { useForm } from 'react-hook-form';
import SnackbarNotify from "../CustomComponent/SnackbarNotify";


const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  company: yup.string().required(),
  adminUserId: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required(),
});

const AddOrganization = () => {
  const { setHeader } = useHead();
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler = async (data) => {
    console.log("inside submit handler");
    try {
      const response = await axios.post('/qfuserservice/signup', data);
      console.log(response.data);
      if(response.data.message = "Successfully updated"){
        setAddSuccessMsg(true);
        setTimeout(() => {
          setAddSuccessMsg(false);
        }, 3000);
      } 
    } catch (error) {
      console.error(error); // handle error
    }
  };

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Organization",
      };
    });
  }, []);



  return (
    <>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Grid container justifyContent="flex-start" alignItems="center" spacing={2}>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              first Name
              <span className="importantfield">*</span></label>
            <input
              {...register("firstName")}
              className={errors.firstName ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.firstName && <span style={{ color: "red" }}>{errors.firstName.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              last Name
              <span className="importantfield">*</span>
              </label>
            <input
              {...register("lastName")}
              className={errors.lastName ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.lastName && <span style={{ color: "red" }}>{errors.lastName.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Organization Name<span className="importantfield">*</span>
            </label>
            <input
              {...register("company")}
              className={errors.company ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.company && <span style={{ color: "red" }}>{errors.company.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Admin User Id<span className="importantfield">*</span>
            </label>
            <input
              {...register("adminUserId")}
              className={errors.adminUserId ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.adminUserId && <span style={{ color: "red" }}>{errors.adminUserId.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Admin Email<span className="importantfield">*</span>
            </label>
            <input
              {...register("email")}
              className={errors.email ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Phone Number
              <span className="importantfield">*</span></label>
            <input
              {...register("phone")}
              type='number'
              className={errors.phone ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.phone && <span style={{ color: "red" }}>{errors.phone.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Password
              <span className="importantfield">*</span>
            </label>

            <input
              {...register("password")}
              className={errors.password ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
          </Stack>
        </Grid>
        <Grid item md={4}>
          <Stack spacing={0.5}>
            <label>
              Confirm Password<span className="importantfield">*</span>
            </label>
            <input
              {...register("confirmPassword")}
              className={errors.confirmPassword ? "error" : "valid"}
              fullWidth
              size="small"
            />
            {errors.confirmPassword && <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>}
          </Stack>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" mt={2}>
        <Grid item md={1.5}>
          <Button fullWidth variant="contained" type="submit" style={{ backgroundColor: "#009fee" }}>
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </form>
            <SnackbarNotify
            open={addSuccessMsg}
            close={setAddSuccessMsg}
            msg="created successfully"
            severity="success"
          />
          </>
  );
  
}

export default AddOrganization