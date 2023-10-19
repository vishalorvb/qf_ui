import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from "../../CustomComponent/Table";
import useHead from "../../hooks/useHead";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { IconButton, Tooltip } from "@mui/material";
import ActiveBIReportsPopup from "./ActiveBIReportsPopup";
import DeactiveBIReportsPopup from "./DeactiveBIReportsPopup";

function ActiveReports() {
  const location = useLocation();
  const [bireports, setBiReports] = useState([]);
  const [openActive, setOpenActive] = useState(false);
  const [openDeactive, setOpenDeactive] = useState(false);
  const [activeObject, setActiveObject] = useState([]);
  const [deactiveObject, setDeactiveObject] = useState([]);
  const [actSuccessMsg, setActSuccessMsg] = useState(false);
  const [deactSuccessMsg, setDeactSuccessMsg] = useState(false);

  var TSMapping_Id = location.state.param1 ? location.state.param1 : 0;

  const activateBIHandler = (e) => {
    setOpenActive(true);
    setActiveObject(e);
  };

  const deactivateBIHandler = (e) => {
    setOpenDeactive(true);
    setDeactiveObject(e);
  };

  const columns = [
    {
      field: "name",
      headerName: "Testset Name",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "created_at_string",
      headerName: "Execution Date",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "report_result",
      headerName: "Pass/Fail Count",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
    {
      field: "",
      headerName: "Actions",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <>
            {param.row.bi_status === 0 ? (
              <Tooltip title="Inactive">
                <IconButton
                  onClick={(e) => {
                    activateBIHandler(param.row);
                  }}
                >
                  <PersonOffOutlinedIcon></PersonOffOutlinedIcon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Active">
                <IconButton
                  onClick={(e) => {
                    deactivateBIHandler(param.row);
                  }}
                >
                  <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      },
    },
  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Active Reports",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBIReports = () => {
    TSMapping_Id &&
      axios
        .get(`Biservice/configbireport/testset/${TSMapping_Id}`)
        .then((resp) => {
          console.log(resp?.data?.info?.bireports);
          const reports = resp?.data?.info ? resp?.data?.info?.bireports : [];
          setBiReports(reports);
        });
  };

  useEffect(() => {
    getBIReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {openActive ? (
        <ActiveBIReportsPopup
          object={activeObject}
          openActive={openActive}
          setOpenActive={setOpenActive}
          getReports={getBIReports}
          setActSuccessMsg={setActSuccessMsg}
        />
      ) : (
        ""
      )}
      {openDeactive ? (
        <DeactiveBIReportsPopup
          object={deactiveObject}
          openDeactive={openDeactive}
          setOpenDeactive={setOpenDeactive}
          getReports={getBIReports}
          setDeactSuccessMsg={setDeactSuccessMsg}
        />
      ) : (
        ""
      )}
      <SnackbarNotify
        open={actSuccessMsg}
        close={setActSuccessMsg}
        msg="Report is active"
        severity="success"
      />
      <SnackbarNotify
        open={deactSuccessMsg}
        close={setDeactSuccessMsg}
        msg="Report is inactive"
        severity="success"
      />
      <Table
        hideSearch={true}
        columns={columns}
        rows={bireports}
        getRowId={(row) => (row ? row.report_id : "")}
      />
    </div>
  );
}

export default ActiveReports;
