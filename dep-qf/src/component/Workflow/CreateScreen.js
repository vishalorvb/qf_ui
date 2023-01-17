import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import Table from "../CustomComponent/Table";
import { baseUrl } from "../../Environment";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

export default function CreateScreen(props) {
  const { module, showCreateScreen, setShowCreateScreen } = props;

  const columns = [
    {
      field: "id",
      headerName: "S.no.",
      flex: 1,
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
    {
      field: "name",
      headerName: "Field Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "input_type",
      headerName: "field Type",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 2,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <NearMeOutlinedIcon />
          </div>
        );
      },
    },
  ];

  const [pageElements, setPageElements] = useState([]);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState({});
  const [preSelectedElement, setPreSelectedElement] = useState([]);

  const getPage = () => {
    axios
      .get(
        baseUrl +
          `/ProjectsMS/Project/getModulePages?moduleId=${module?.module_id}`
      )
      .then((resp) => {
        setPages(resp.data);
        setSelectedPage(resp.data[0]);
      });
  };

  const getPageElements = () => {
    axios
      .get(
        baseUrl + `/ProjectsMS/Project/getModulePagesElements?webPageId=${12}`
      )
      .then((resp) => {
        setPageElements(resp.data);
        setPreSelectedElement(() => {
          const data = resp.data;
          const selectedData = data
            .filter((item) => item.is_selected === true)
            .map((item) => item.id);
          console.log(selectedData);
          return selectedData;
        });
      });
  };

  useEffect(() => {
    getPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  useEffect(() => {
    selectedPage?.web_page_id !== undefined && getPageElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPage]);

  return (
    <Dialog open={showCreateScreen} fullWidth>
      <DialogTitle
        id="alert-dialog-title"
        className="dialogTitle border-bottom"
        sx={{
          padding: 0.5,
          backgroundColor: "primary.main",
        }}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className="poptitle"
        >
          <Typography
            sx={{ marginLeft: 1, marginTop: "auto", marginBottom: "auto " }}
            variant="inherit"
          >
            Add User{" "}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              setShowCreateScreen(false);
            }}
            className="btn-close "
          >
            <ClearIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent className="AddUsers" style={{ marginTop: "10px" }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Box
            component="main"
            sx={{
              border: "snow",
              flexGrow: 1,
              overflow: "auto",
              padding: "0px",
              margin: "0px",
            }}
          >
            <Grid
              container
              justifyContent="flex-end"
              sx={{ marginBottom: "10px" }}
            >
              <Button variant="contained">Generate Page</Button>
            </Grid>

            <Table
              rows={pageElements}
              columns={columns}
              checkboxSelection={true}
              selectionModel={preSelectedElement}
              setSelectionModel={setPreSelectedElement}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        style={{
          marginTop: "1px",
          marginBottom: "5px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={console.log(1)}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
