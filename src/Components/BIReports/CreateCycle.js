import { useForm, TextFieldElement, SelectElement } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";

export default function CreateCycle({ testsetData, getCycles }) {
  const [addSuccessMsg, setAddSuccessMsg] = useState(false);
  const [addErrorMsg, setAddErrorMsg] = useState(false);
  const [selectedReport, setSelectedReport] = useState([]);

  const schema = yup.object().shape({
    cycleName: yup.string().required("Please Enter a Valid cycle Name"),
  });
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const submit = (data) => {
    // console.log(data);
    const postData = {
      cycle_id: 0,
      cycle_name: data?.cycleName,
      project_id: testsetData[0]?.project_id,
      reports: selectedReport,
    };
    // console.log(postData);
    axios.post(`/Biservice/projects/cycles/create`, postData).then((resp) => {
      // console.log(resp)
      if (resp.data.message == "Succesfully Created Cycle") {
        setAddSuccessMsg(true);
        reset();
        getCycles();
        setTimeout(() => {
          setAddSuccessMsg(false);
        }, 3000);
      } else {
        setAddErrorMsg(true);
        reset();
        getCycles();
        setTimeout(() => {
          setAddErrorMsg(false);
        }, 3000);
      }
    });
  };

  useEffect(() => {
    // console.log(selectedReport);
  }, [selectedReport]);

  // console.log(testsetData)
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={1}>
          <Typography>Cycle Name :</Typography>
          <TextFieldElement
            id="cycle-name"
            variant="outlined"
            size="small"
            name="cycleName"
            control={control}
          />
          {testsetData.map((testset) => (
            <Grid container direction="row" spacing={2}>
              <Grid item md={2}>
                <Typography>{testset?.testset_name}</Typography>
              </Grid>
              <Grid item md={5}>
                <SelectElement
                  name={testset?.testset_name}
                  control={control}
                  fullWidth
                  size="small"
                  options={testset?.reports}
                  valueKey="report_id"
                  labelKey="name"
                  onChange={(e) => {
                    const a = testset?.reports?.find(
                      (report) => report?.report_id === e
                    );
                    setSelectedReport((ps) => {
                      const index = ps.findIndex(
                        (report) => report?.testset_id === testset?.testset_id
                      );
                      // console.log(index);
                      if (index !== -1) ps[index].report_id = a?.report_id;
                      return index !== -1
                        ? [...ps]
                        : [
                            ...ps,
                            {
                              module_id: a.module_id,
                              testset_id: a.testset_id,
                              report_id: a.report_id,
                              bi_testset_map_id: testset?.id,
                            },
                          ];
                    });
                    // console.log(e);
                  }}
                />
              </Grid>
            </Grid>
          ))}
          <Stack direction="row" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Save & Continue
            </Button>
          </Stack>
        </Stack>
      </form>
      <SnackbarNotify
        open={addSuccessMsg}
        close={setAddSuccessMsg}
        msg={"Created Successfully"}
        severity="success"
      />
      <SnackbarNotify
        open={addErrorMsg}
        close={setAddErrorMsg}
        msg={"Failed"}
        severity="error"
      />
    </>
  );
}
