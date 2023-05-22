import React from 'react'
import GrowingTable from '../../CustomComponent/GrowingTable'
import { Apidata } from './Data'
function Param() {

function handleParamData(tabdata){
  Apidata.params_list = tabdata
}
  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleParamData}
      keypair ={["param_key","param_value","param_desc"]}
      prefilled={Apidata.params_list?.slice(0, -1)}
      order={["param_key","param_value","param_desc"]}
      ></GrowingTable>
    </div>
  )
}

export default Param
