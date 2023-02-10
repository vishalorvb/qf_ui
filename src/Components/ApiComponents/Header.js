import React, { useContext } from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'


function Header() {

 function handleHeaderData(tabdata){
  Apidata.headers_list = tabdata
 }

  return (
    <div>
      <h1>This is header</h1>
      

      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleHeaderData}
      ></GrowingTable>
    </div>
  )
}

export default Header
