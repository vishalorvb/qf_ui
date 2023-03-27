import React from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'

function handleParamData(tabdata){
    console.log(tabdata)
  }




function ApiParam() {
  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleParamData}
      keypair ={["param_key","param_value","param_desc"]}
      ></GrowingTable>
    </div>
  )
}

export default ApiParam
