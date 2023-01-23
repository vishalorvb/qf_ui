import React from 'react'
import GrowingTable from './GrowingTable'

function Response() {
  return (
    <div>
      <h1>This is response</h1>
      <GrowingTable
      header={["Key","Value","Description"]}
      ></GrowingTable>
    </div>
  )
}

export default Response
