import React, { useContext } from 'react'
import GrowingTable from '../../CustomComponent/GrowingTable'
import { Apidata } from './Data'


function Header() {
  let displayorder = ["header_key", "header_value", "header_desc"]

  function handleHeaderData(tabdata) {
    Apidata.headers_list = tabdata
  }

  return (
    <div>
      <GrowingTable
        header={["Key", "Value", "Description"]}
        TableData={handleHeaderData}
        keypair={["header_key", "header_value", "header_desc"]}
        // prefilled ={Apidata.headers_list==undefined?[]: Apidata.headers_list.slice(0,-1)}
        prefilled={Apidata.headers_list?.slice(0, -1)}
        order={displayorder}
      ></GrowingTable>
    </div>
  )
}

export default Header
