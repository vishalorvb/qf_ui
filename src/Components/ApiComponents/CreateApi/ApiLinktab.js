import React from 'react'
import GrowingTable from '../../../CustomComponent/GrowingTable'

function ApiLinktab() {

    function handleLinkData(tabdata){
        console.log(tabdata)
      }
  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleLinkData}
      keypair ={["key","value","description"]}
      ></GrowingTable>
    </div>
  )
}

export default ApiLinktab
