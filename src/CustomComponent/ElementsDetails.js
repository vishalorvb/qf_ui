import React, { useEffect, useState } from "react";
import MastPop from "./MastPop";
import { getElementsDetails } from "../Services/ApplicationService";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  MultiSelectElement,
  SelectElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import * as yup from "yup";
function ElementsDetails({ ElementId, setPopup }) {
  const [details, setDetails] = useState();
  const [allXpath, setAllXpath] = useState([]);
  const [selectedXpath, setSelectedXpath] = useState([]);
  useEffect(() => {
    getElementsDetails(setDetails, ElementId);
  }, [ElementId]);
  const schema = yup.object().shape({});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(details);
    setAllXpath(() =>
      details?.all_xpaths
        ?.split("XPATH_SEPARATOR")
        ?.filter((d) => d !== "")
        ?.map((x) => {
          const splits = x?.split("=FIELD_VALUE=");
          return {
            pathntype: x,
            id: splits[0],
            label: splits[0],
            path: splits[1],
          };
        })
    );

    reset({
      fieldname: details?.name,
      path: details?.selected_xpath,
      fieldType: details?.input_type,
      otherFieldType: details?.secondary_input_type,
      pathType: details?.prefered_field,
    });
  }, [details]);

  const updateElement = (elementData) => {
    console.log(elementData);
  };

  return (
    <Dialog open={true} onClose={() => setPopup(false)}>
      <DialogTitle className="dialogTitle">Elements Details</DialogTitle>
      <form onSubmit={handleSubmit(updateElement)}>
        <DialogContent>
          <Stack direction="row" spacing={11} mt={3}>
            <SelectElement
              label="Path Type"
              name="pathType"
              size="medium"
              onChange={(e) => {
                const path = allXpath.find((xpath) => xpath?.id === e)?.path;
                setValue("path", path);
              }}
              control={control}
              sx={{ width: 200 }}
              options={allXpath || []}
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
              name="otherFieldType"
              label="Other Field Type"
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
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" type="submit">
            update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ElementsDetails;
