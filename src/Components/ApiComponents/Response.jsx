import React from 'react'
import GrowingTable from '../../CustomComponent/GrowingTable'
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
      keypair ={["key","value","description"]}
      prefilled={Apidata.successResponseProperties?.slice(0, -1)}
      order={["key","value","description"]}
      ></GrowingTable>
    </div>
  )
}

export default Response
