import { Button, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import NavListRendedrer from "../CustomComponent/NavListRenderer";
import useHead from "../hooks/useHead";
import useAuth from "../hooks/useAuth";
import {
  customCodeCreate,
  customCodeDelete,
  getCustomCode,
  getCustomCodeList,
} from "../Services/QfService";
import { Stack } from "@mui/system";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";

export default function CustomCode() {
  const [codeList, setCodeList] = useState([]);
  const [selectedCode, setSelectedCodeselectedCode] = useState({});
  const [selectedCodeData, setselectedCodeData] = useState({
    code: "",
    custom_code_page_name: "",
  });
  const { globalApplication, globalProject, setSnackbarData, snackbarData } =
    useHead();
  const { auth } = useAuth();

  useEffect(() => {
    console.log(globalApplication);
    globalApplication?.module_id &&
      getCustomCodeList(
        globalApplication?.module_id,
        auth?.userId,
        setCodeList
      );
  }, [globalApplication, snackbarData]);

  useEffect(() => {
    if (codeList?.length > 0 && codeList[codeList?.length - 1]["id"] == 0) {
      setSelectedCodeselectedCode(codeList[codeList?.length - 1] ?? {});
    } else {
      setSelectedCodeselectedCode(codeList[0] ?? {});
    }
  }, [codeList]);

  useEffect(() => {
    if (selectedCode?.id == 0) {
      setselectedCodeData(codeList[codeList?.length - 1]);
    } else if (selectedCode.id) {
      getCustomCode(selectedCode?.id, setselectedCodeData);
    }
  }, [selectedCode, snackbarData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setselectedCodeData((ps) => {
      return { ...ps, [id]: value };
    });
  };

  const handleSave = () => {
    const postData = {
      ...selectedCodeData,
      project_id: globalProject?.project_id,
      id: undefined,
      makedefault: false,
    };
    globalApplication?.module_id &&
      globalProject?.project_id &&
      customCodeCreate(postData, setSnackbarData);
  };

  const handleDelete = () => {
    globalApplication?.module_id &&
      globalProject?.project_id &&
      customCodeDelete(selectedCodeData?.id, setSnackbarData);
  };

  const handleAddNew = () => {
    setCodeList((ps) => {
      return [
        ...ps?.filter((list) => list.id != 0),
        { id: 0, custom_code_page_name: "New Class", code: "Your Code" },
      ];
    });
  };

  return (
    <>
      <Grid container justifyContent="flex-end">
        <Grid item md={4}>
          <ProjectnApplicationSelector />
        </Grid>
      </Grid>

      <Grid container justifyContent="space-evenly">
        <Grid md={3} item>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>All Classes </Typography>
            <Button variant="contained" onClick={handleAddNew}>
              Add Class
            </Button>
          </Stack>
          <NavListRendedrer
            listData={codeList}
            selectedObject={selectedCode}
            setSelectedObject={setSelectedCodeselectedCode}
            displayKey={"custom_code_page_name"}
            id={"id"}
          />
          ;
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid md={8} container item direction="column" gap={2}>
          <Grid item>
            <Typography>
              Class Name<span className="importantfield">*</span>
            </Typography>
          </Grid>
          <Grid item>
            <input
              id="custom_code_page_name"
              value={selectedCodeData?.custom_code_page_name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <input
              id="code"
              value={selectedCodeData?.code}
              onChange={handleChange}
            />
          </Grid>
          <Grid container item justifyContent="flex-end" gap={2}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
