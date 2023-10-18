/*
**********  Vishal Kumar (4734) ********

input parameters (in State):
        projectId ;
        applicationId ;
        testcaseId ;
        testcaseName ;

Result:
        Create and update dataset of web type
*/

import React, { lazy, useEffect, useState } from "react";
import WebDatasetList from "./WebDatasetList";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import useHead from "../../../hooks/useHead";
const CreateWebDataset = lazy(() => import("./CreateWebDataset"));

function WebDataset() {
  let [toogle, setToogle] = useState(true);
  let { setHeader } = useHead();
  let navigate = useNavigate();
  let location = useLocation();
  let [editDatasetId, setEditDatasetId] = useState(0);
  let [copy, setCopy] = useState(false);

  let projectId;
  let applicationId;
  let testcaseId;
  let testcaseName;

  try {
    projectId = location.state.projectId;
    applicationId = location.state.applicationId;
    testcaseId = location.state.testcaseId;
    testcaseName = location.state.testcaseName;
  } catch (error) {
    navigate("/Testcase/Recent");
  }

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: location.state?.testcaseName,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testcaseName]);

  return (
    <div>
      {toogle === true ? (
        <div>
          <div className="apptable">
            <div className="intable">
              <div style={{ marginTop: "12px", float: "right" }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={(e) => {
                    setToogle(!toogle);
                  }}
                >
                  Add Datasets
                </Button>
              </div>
            </div>
            <WebDatasetList
              projectId={projectId}
              applicationId={applicationId}
              testcaseId={testcaseId}
              setEditDatasetId={setEditDatasetId}
              setToogle={setToogle}
              setCopy={setCopy}
            ></WebDatasetList>
          </div>
        </div>
      ) : (
        <div>
          <CreateWebDataset
            testcaseId={testcaseId}
            copy={copy}
            setToogle={() => {
              setToogle(true);
              setEditDatasetId(0);
              setCopy(false);
            }}
            datasetId={editDatasetId}
          ></CreateWebDataset>
        </div>
      )}
    </div>
  );
}

export default WebDataset;
