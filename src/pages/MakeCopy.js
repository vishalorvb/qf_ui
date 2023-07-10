import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Stack, Typography } from "@mui/material";
import useHead from "../hooks/useHead";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const MakeCopy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setHeader, setSnackbarData } = useHead();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const { name, description } = data;
    const url = location?.pathname?.includes("CopyTestcase")
      ? `/qfservice/webtestcase/copyTestcase?testcase_id=${location?.state?.id}&project_id=${location?.state?.projectId}&testcase_name=TC_${name}&testcase_desc=${description}`
      : location?.pathname?.includes("CopyTestset")
      ? `/qfservice/webtestset/copyTestSet?testset_id=${location?.state?.id}&project_id=${location?.state?.projectId}&testset_name=TS_${name}&testset_desc=${description}`
      : `/qfservice/copyProject?project_id=${location?.state?.id}&project_name=${name}&project_desc=${description}`;

    axios.post(url).then((resp) => {
      setSnackbarData({
        status: true,
        message: resp?.data?.message,
        severity: resp?.data?.status,
      });
      resp?.data?.status === "SUCCESS" && navigate(-1);
    });
  };

  useEffect(() => {
    const name = location?.pathname?.includes("CopyTestcase")
      ? "Copy Testcase"
      : location?.pathname?.includes("CopyTestset")
      ? "Copy Testset"
      : "Copy Project";
    setHeader((ps) => {
      return { ...ps, name: name };
    });
    console.log(location);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography>Making Copy Of {location?.state?.name}</Typography>
      <Stack gap={2} direction="row">
        <Stack>
          <label>Name</label>
          <TextField
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name ? "Name is required" : ""}
            margin="normal"
            fullWidth
            size="small"
          />
        </Stack>
        <Stack>
          <label>Description</label>
          <TextField
            {...register("description", { required: true })}
            error={!!errors.description}
            helperText={errors.description ? "Description is required" : ""}
            margin="normal"
            fullWidth
            size="small"
          />
        </Stack>
      </Stack>
      <Stack direction="row-reverse">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default MakeCopy;
