import { yupResolver } from "@hookform/resolvers/yup";
import { Button, MenuItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import {
  MultiSelectElement,
  useForm,
} from "react-hook-form-mui";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import useHead from "../../../hooks/useHead";
import * as yup from "yup";
import { Stack } from "@mui/system";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";

export default function MapScreen() {
  const { setHeader } = useHead();
  const location = useLocation();
  const navigate = useNavigate();
  const [pagesnScreens, setPagesnScreens] = useState([]);
  const [screenUpdated, setScreenUpdated] = useState(false);
  let [snackbarError, setSnackbarError] = useState(false);

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
      module_id: location?.state?.moduleId,
      project_id: location?.state?.projectId,
      testcase_id: location?.state?.testcaseId,
      testcase_sprints: [],
      screens_in_testcase: screens,
    };
    if(screensData.screens_in_testcase.length == 0)
    {
      navigate(-1)
    }
    if (screensData.screens_in_testcase.length !== 0) {
    axios
      .post(`/qfservice/webtestcase/ScreensMapping`, screensData)
      .then((resp) => {
        resp?.data?.status === "SUCCESS" && setScreenUpdated(true);
        setTimeout(() => {
          resp?.data?.status === "SUCCESS" && navigate(-1);
        }, 1000);
      });
    }
  };
  useEffect(() => {
    axios
      .get(
        `/qfservice/webtestcase/getScreensInTestcase?module_id=${location?.state?.moduleId}&project_id=${location?.state?.projectId}&testcase_id=${location?.state?.testcaseId}`
      )
      .then((resp) => {
        const data = resp?.data?.info;
        const webpagesList = data[0]?.webpagesList;
        setPagesnScreens(webpagesList);
        const object = {};
        webpagesList.map((page) => {
          object[page.name] = page.screens_list
            .filter((screen) => {
              return screen?.is_select === true;
            })
            .map((screen) => screen?.screen_id);
        });
        reset(object);
      });

    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Screens",
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
      <SnackbarNotify
        open={screenUpdated}
        close={setScreenUpdated}
        msg={"Screens mapped to testcase successfully"}
        severity="success"
      />
      <SnackbarNotify
        open={snackbarError}
        close={setSnackbarError}
        msg="Select Atleast One Screen"
        severity="error"
      />

      {pagesnScreens.map((page) => {
        return (
          <Fragment key={page?.web_page_id}>
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
          </Fragment>
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
