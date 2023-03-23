import React, { useContext } from 'react'
import GrowingTable from './GrowingTable'
import { Apidata } from './Data'


function Header() {

  let demojson =[
    {
      "k1":"hello",
      "k2":"world",
      "k3":"fwfdw"
    },
    {
      "k1":"ngbdg",
      "k2":"wgdnorld",
      "k3":"fwfdwbfb"
    }
  ]
  let displayorder = ["k2", "k3","k1"]

 function handleHeaderData(tabdata){
  Apidata.headers_list = tabdata
  console.log(tabdata)
 }

  return (
    <div>
      <GrowingTable
      header={["Key","Value","Description"]}
      TableData = {handleHeaderData}
      keypair ={["key","value","description"]}
      prefilled ={demojson}
      order ={displayorder}
      ></GrowingTable>
    </div>
  )
}

export default Header
