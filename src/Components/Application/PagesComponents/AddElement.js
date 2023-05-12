import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import * as yup from "yup";
import axios from "../../../api/axios";
export default function AddElement({ setPopup, webPageId, setelementAdded }) {
  const schema = yup.object().shape({
    pathType: yup.string().required("select path type"),
    path: yup.string().required("path is required"),
    fieldname: yup.string().required("Field name is required"),
    tagname: yup.string().required("tag name is required"),
    fieldType: yup.string().required("select the field type"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleElementSave = (data) => {
    console.log(data);
    const elementData = {
      element_id: 0,
      web_page_id: webPageId,
      name: data?.fieldname,
      input_type: data?.fieldType,
      tag_name: data?.tagname,
      prefered: data?.pathType,
      all_xpaths: `absolute_xpath=FIELD_VALUE=${
        data?.pathType === "absolute_xpath" ? data?.path : ""
      }XPATH_SEPARATORxpath_name=FIELD_VALUE=${
        data?.pathType === "xpath_name" ? data?.path : ""
      }XPATH_SEPARATORxpath_id=FIELD_VALUE=${
        data?.pathType === "xpath_id" ? data?.path : ""
      }`,
      selected_xpath: data?.path,
      secondary_input_type: data?.secondaryFieldType,
    };
    axios
      .postForm(`/qfservice/webpages/addNewPageElement`, elementData)
      .then((resp) => {
        resp?.data?.status === "SUCCESS" && setelementAdded(true);
        resp?.data?.status === "SUCCESS" && setPopup(false);
      });
  };

  return (
    <>
      <Dialog open={true} onClose={() => setPopup(false)}>
        <DialogTitle className="dialogTitle">Elements Details</DialogTitle>
        <form onSubmit={handleSubmit(handleElementSave)}>
          <DialogContent>
            <Stack direction="row" spacing={1} mt={3}>
              <SelectElement
                label="Path Type"
                name="pathType"
                size="medium"
                control={control}
                sx={{ width: 200 }}
                options={[
                  { id: "absolute_xpath", label: "absolute_xpath" },
                  { id: "xpath_name", label: "xpath_name" },
                  { id: "xpath_id", label: "xpath_id" },
                ]}
              />
              <TextFieldElement
                id="name"
                label="Path"
                variant="outlined"
                size="small"
                name="path"
                fullWidth
                control={control}
              />
            </Stack>
            <Stack spacing={2} mt={2}>
              <TextFieldElement
                id="field-name"
                label="Field Name"
                variant="outlined"
                size="small"
                name="fieldname"
                fullWidth
                control={control}
              />
              <SelectElement
                name="fieldType"
                label="Field Type"
                size="medium"
                fullWidth
                control={control}
                options={[
                  { id: "", label: "Nothing Selected" },
                  { id: "Label", label: "Label" },
                  { id: "Button", label: "Button" },
                  { id: "InputText", label: "InputText" },
                  { id: "Link", label: "Link" },
                ]}
              />
              <SelectElement
                name="secondaryFieldType"
                label="Secondary Field Type"
                size="medium"
                fullWidth
                control={control}
                options={[
                  { id: "", label: "Nothing Selected" },
                  { id: "DropDown", label: "DropDown" },
                  { id: "MouseOver", label: "MouseOver" },
                  { id: "WindowSwitch", label: "WindowSwitch" },
                  { id: "Alert", label: "Alert" },
                ]}
              />
              <TextFieldElement
                id="tag-name"
                label="Tag Name"
                variant="outlined"
                size="small"
                name="tagname"
                fullWidth
                control={control}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
