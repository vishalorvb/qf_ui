import React from "react";
import GrowingTable from "../../../CustomComponent/GrowingTable";
import { setGetData } from "./ApiDatasetData";

function ApiResponse({ ApiDetails }) {
  let displayorder = ["key", "value", "description"];
  function handleResponseData(tabdata) {
    setGetData(
      ApiDetails.api_id,
      "successResponseProperties",
      tabdata?.slice(0, -1)
    );
  }
  return (
    <div>
      <GrowingTable
        header={["Key", "Value", "Description"]}
        TableData={handleResponseData}
        keypair={["key", "value", "description"]}
        order={displayorder}
        prefilled={ApiDetails?.successResponseProperties}
      ></GrowingTable>
    </div>
  );
}

export default ApiResponse;
