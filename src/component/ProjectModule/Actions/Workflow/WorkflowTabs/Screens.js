import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../../../Environment";
import WorkflowNav from "../WorkflowNav";
import Table from "../../../../Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import CreateScreen from "../CreateScreen";
import Pillnav from "../../../../../Pillnav";

export default function Screens(props) {
  const { module } = props;

  const [screensList, setScreensList] = useState([]);
  const [screensElements, setScreensElements] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState({});
  const [showCreateScreen, setShowCreateScreen] = useState(false);

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
      flex: 3,
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

  const getModuleScreens = () => {
    axios
      .get(
        baseUrl +
          `/ProjectsMS/Project/getModuleScreens?moduleId=${module?.module_id}`
      )
      .then((resp) => {
        setScreensList(resp.data);
        setSelectedScreen(resp.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getModuleScreensElements = () => {
    axios
      .get(
        baseUrl +
          `/ProjectsMS/Project/getModuleScreensElements?screenId=${selectedScreen?.screen_id}`
      )
      .then((resp) => {
        setScreensElements(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getModuleScreens();
  }, [module]);

  useEffect(() => {
    selectedScreen?.screen_id !== undefined && getModuleScreensElements();
  }, [selectedScreen]);

  return (
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
      <Pillnav
        workflowModules={screensList}
        selectClickedElement={setSelectedScreen}
      />
      <div className="tableTopSection fd-r">
        <Button variant="contained" onClick={() => setShowCreateScreen(true)}>
          Create Screens
        </Button>
      </div>

      <Table rows={screensElements} columns={columns} hidefooter={false} />
      <CreateScreen
        showCreateScreen={showCreateScreen}
        setShowCreateScreen={setShowCreateScreen}
        module={module}
      />
    </Box>
  );
}
