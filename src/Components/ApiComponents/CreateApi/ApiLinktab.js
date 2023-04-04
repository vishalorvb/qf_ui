import React from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'
import { setGetData } from './ApiDatasetData'


function ApiLinktab({ApiDetails}) {
  let displayorder = ["key", "value", "description"]
  function handleLinkData(tabdata) {
    setGetData(ApiDetails.api_id, "apiLinkProperties", tabdata.slice(0, -1))
  }

  return (
    <div>
      <GrowingTable
        header={["Key", "Value", "Description"]}
        TableData={handleLinkData}
        keypair={["key", "value", "description"]}
        order={displayorder}
        prefilled={ApiDetails?.apiLinkProperties}
      ></GrowingTable>
    </div>
  )
}

export default ApiLinktab
