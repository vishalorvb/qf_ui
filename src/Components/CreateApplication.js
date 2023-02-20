import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";

export default function CreateApplication(props) {
  const { open, close, type } = props;
  const handleClose = () => {
    close(false);
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    baseUrl: yup.string().url().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    // console.log(data);
    // console.log(type);
    console.log({
      name: data.name,
      baseUrl: data.baseUrl,
      type: type,
      desc: data.description,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="dialogTitle">Create Application</DialogTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <DialogContent className="dialogContent">
          <Grid container spacing={1}>
            <Grid item md={12}>
              <TextFieldElement
                id="application-name"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
                name="name"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                id="application-baseUrl"
                label="base URL"
                variant="outlined"
                size="small"
                fullWidth
                name="baseUrl"
                control={control}
              />
            </Grid>
            <Grid item md={12}>
              <TextFieldElement
                id="application-desc"
                label="Description"
                variant="outlined"
                size="small"
                fullWidth
                name="description"
                control={control}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
