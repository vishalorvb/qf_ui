import React, { useContext } from 'react'
import GrowingTable from '../../CustomComponent/GrowingTable'
import { Apidata } from './Data'


function Header() {
  let displayorder = ["key", "value", "description"]

  function handleHeaderData(tabdata) {
    Apidata.headers_list = tabdata
  }

  return (
    <div>
      <GrowingTable
        header={["Key", "Value", "Description"]}
        TableData={handleHeaderData}
        keypair={["key", "value", "description"]}
        // prefilled ={Apidata.headers_list==undefined?[]: Apidata.headers_list.slice(0,-1)}
        prefilled={Apidata.headers_list?.slice(0, -1)}
        order={displayorder}
      ></GrowingTable>
    </div>
  )
}

export default Header
