import React, { useContext } from 'react'
import GrowingTable from './GrowingTable'
import { CreateApi } from './Api';


function Header() {

  const {data,setData} = useContext(CreateApi);
  console.log(data)
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
