import React from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'

function Response() {
  
  function handleResponseData(tabdata){
    Apidata.successResponseProperties = tabdata
  }


  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleResponseData}
      ></GrowingTable>
    </div>
  )
}

export default Response
