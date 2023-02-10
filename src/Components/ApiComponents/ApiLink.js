import React from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'


function ApiLink() {

function handleLinkData(tabdata){
  Apidata.apiLinkProperties = tabdata
}
  return (
    <div>
      <h1>Api link param</h1>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleLinkData}
      ></GrowingTable>
    </div>
  )
}

export default ApiLink
