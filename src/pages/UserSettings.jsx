import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const schema = Yup.object().shape({
  gitUrl: Yup.string().required("Git Url is required"),
  token: Yup.string().required("Token is required"),
});

export default function UserSettings() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-unit">
          <label>Git Repo URL:</label>
          <Controller
            name="gitUrl"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} id="inputValue" />}
          />
        </div>
        <div className="form-unit">
          <label>Token:</label>
          <Controller
            name="token"
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} id="inputValue" />}
          />
        </div>

        <div className="form-submit-unit">
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <span className="tocken-badge">
        Token <DeleteOutlineIcon />
      </span>
    </>
  );
}
