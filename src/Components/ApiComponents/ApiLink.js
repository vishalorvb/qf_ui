import React from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'


function ApiLink() {

function handleLinkData(tabdata){
  Apidata.apiLinkProperties = tabdata
}
  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleLinkData}
      ></GrowingTable>
    </div>
  )
}

export default ApiLink
