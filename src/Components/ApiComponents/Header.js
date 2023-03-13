import React, { useContext } from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'


function Header() {

 function handleHeaderData(tabdata){
  Apidata.headers_list = tabdata
 }

  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleHeaderData}
      keypair ={["key","value","description"]}
      ></GrowingTable>
    </div>
  )
}

export default Header
