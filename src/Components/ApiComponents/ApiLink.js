import React from 'react'
import GrowingTable from './GrowingTable'

function ApiLink() {
  return (
    <div>
      <h1>Api link param</h1>
      <GrowingTable
      header={["Key","Value","Description"]}
      ></GrowingTable>
    </div>
  )
}

export default ApiLink
