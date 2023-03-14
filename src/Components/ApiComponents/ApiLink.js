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
      keypair ={["key","value","description"]}
      ></GrowingTable>
    </div>
  )
}

export default ApiLink
