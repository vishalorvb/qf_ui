import React from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'
function Param() {

function handleParamData(tabdata){
  Apidata.params_list = tabdata
}


  return (
    <div>
      <h1>This is param</h1>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleParamData}
      ></GrowingTable>
    </div>
  )
}

export default Param
