import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import {
  MultiSelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import useHead from "../../../hooks/useHead";
import * as yup from "yup";
import { Stack } from "@mui/system";

export default function CreateWebTestcase() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [pagesnScreens, setPagesnScreens] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(yup.object().shape({})),
  });
  const onSubmit = (data) => {
    let screens = [];
    for (const key in data) {
      if (data[key]) {
        screens = [
          ...screens,
          ...data[key].map((screenId) => {
            return { screen_id: screenId };
          }),
        ];
      }
    }

    const screensData = {
      module_id: location?.state?.applicationId,
      project_id: location?.state?.projectId,
      testcase_id: location?.state?.testcaseId,
      testcase_sprints: [],
      screens_in_testcase: screens,
    };

    axios
      .post(`/qfservice/webtestcase/ScreensMapping`, screensData)
      .then((resp) => {
        console.log(resp);
      });

    console.log(screens);
  };
  useEffect(() => {
    axios
      .get(
        `/qfservice/webtestcase/getScreensInTestcase?module_id=940&project_id=837&testcase_id=938`
      )
      .then((resp) => {
        const data = resp?.data?.info;
        const webpagesList = data[0]?.webpagesList;
        setPagesnScreens(webpagesList);
        console.log(data);
      });

    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Screens",
        // plusButton: true,
        // plusCallback: () => navigate("CreateTestcase"),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <TextFieldElement
        id="sprint"
        label="Sprint"
        fullWidth
        select
        size="small"
        name="sprint"
        control={control}
      >
        {/* {cicdTypes?.map((type) => (
                  <MenuItem value={type.id}>{type.name}</MenuItem>
                ))} 
        <MenuItem>Sprint</MenuItem>
      </TextFieldElement> */}

      {/* <TextFieldElement
        id="issue"
        label="Issue"
        fullWidth
        select
        size="small"
        name="issue"
        control={control}
      >
        {/* {cicdTypes?.map((type) => (
                  <MenuItem value={type.id}>{type.name}</MenuItem>
                ))} 
        <MenuItem>Issue</MenuItem>
      </TextFieldElement> */}

      {pagesnScreens.map((page) => {
        return (
          <>
            <label>{page?.name}</label>
            <MultiSelectElement
              itemKey="screen_id"
              itemLabel="name"
              options={page?.screens_list}
              name={page?.name}
              control={control}
              sx={{ width: 200 }}
              fullWidth
              size="small"
              showCheckbox
              renderValue={(screensArray) => {
                return screensArray.map((id) => {
                  const screen = page?.screens_list?.find(
                    (screen) => screen?.screen_id === id
                  );
                  return screen?.name;
                });
              }}
            ></MultiSelectElement>
          </>
        );
      })}
      <Stack mt={1} direction="row" justifyContent="flex-end">
        <Button type="submit" variant="contained">
          save
        </Button>
      </Stack>
    </form>
  );
}
