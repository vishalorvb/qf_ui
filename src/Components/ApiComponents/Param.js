import React from 'react'
import GrowingTable from './GrowingTable'
function Param() {
  return (
    <div>
      <h1>This is param</h1>
      <GrowingTable
      header={["Key","Value","Description"]}
      ></GrowingTable>
    </div>
  )
}

export default Param
