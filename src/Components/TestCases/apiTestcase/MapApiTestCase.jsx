import React, { useEffect, useState } from "react";
import { getApiOfApplication } from "../../../Services/QfService";
import Table from "../../../CustomComponent/Table";
import { getApiOfTestcase } from "../../../Services/QfService";

function MapApiTestCase({ moduleId, testcaseId, setApiList }) {
  let [api, setApi] = useState([]);
  let [selectedApi, setSelectedApi] = useState([]);
  const columns = [
    {
      field: "api_name",
      headerName: "API Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "api_description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    if (testcaseId === 0) {
      getApiOfApplication(setApi, moduleId);
    } else {
      getApiOfTestcase(setApi, testcaseId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedApi(() =>
      api?.filter((api) => api.is_selected === true)?.map((api) => api.api_id)
    );
  }, [api]);

  useEffect(() => {
    setApiList(selectedApi);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedApi]);

  return (
    <div>
      <Table
        searchPlaceholder="Search APIs"
        rows={api}
        columns={columns}
        hidefooter={true}
        checkboxSelection={true}
        getRowId={(row) => row.api_id}
        selectionModel={selectedApi}
        setSelectionModel={setSelectedApi}
      ></Table>
    </div>
  );
}

export default MapApiTestCase;
