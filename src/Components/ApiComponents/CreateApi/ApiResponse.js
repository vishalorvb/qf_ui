import React from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'

function ApiResponse() {

    function handleResponseData(tabdata){
       console.log(tabdata)
      }
  return (
    <div>
       <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleResponseData}
      keypair ={["key","value","description"]}
      ></GrowingTable>
    </div>
  )
}

export default ApiResponse
