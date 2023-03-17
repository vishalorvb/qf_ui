import { yupResolver } from "@hookform/resolvers/yup";
import { MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import {
  MultiSelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useLocation } from "react-router-dom";
import axios from "../../../api/axios";
import useHead from "../../../hooks/useHead";

export default function CreateWebTestcase() {
  const { setHeader } = useHead();
  const location = useLocation();
  const [pages, setPages] = useState([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(),
  });
  useEffect(() => {
    axios
      .get(
        `http://10.11.12.243:8083/qfservice/webpages/getWebPagesList?module_id=${location?.state?.applicationId}`
      )
      .then((resp) => {
        setPages(resp?.data?.info);
      });

    setHeader((ps) => {
      return {
        ...ps,
        name: "Add Screens",
        plusButton: true,
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
    <div>
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

      {pages.map((page) => {
        return (
          <>
            <label>{page?.name}</label>
            <MultiSelectElement
              sx={{ width: 200 }}
              id="sprint"
              fullWidth
              select
              size="small"
              name="sprint"
              control={control}
              options={["a", "b"]}
            ></MultiSelectElement>
          </>
        );
      })}
    </div>
  );
}
