import GrowingTable from "../../../CustomComponent/GrowingTable";
import { setGetData } from "./ApiDatasetData";

function ApiParam({ ApiDetails }) {
  let displayorder = ["param_key", "param_value", "param_desc"];
  function haldleTableData(data) {
    setGetData(ApiDetails.api_id, "paramsList", data.slice(0, -1));
  }
  return (
    <div>
      <GrowingTable
        header={["Key", "Value", "Description"]}
        TableData={haldleTableData}
        keypair={["param_key", "param_value", "param_desc"]}
        order={displayorder}
        prefilled={ApiDetails?.paramsList}
      ></GrowingTable>
    </div>
  );
}

export default ApiParam;
