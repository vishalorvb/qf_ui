import React, { useContext } from 'react'
import GrowingTable from './GrowingTable'



function Header() {

 
  return (
    <div>
      <h1>This is header</h1>
      

      <GrowingTable
      header={["Key","Value","Description"]}
      ></GrowingTable>
    </div>
  )
}

export default Header
