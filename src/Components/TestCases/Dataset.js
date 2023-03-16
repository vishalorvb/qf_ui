import React, { useEffect, useState } from 'react'
import { getScreen } from '../../Services/pageService'
import Table from "../../CustomComponent/Table";
import CreateDataSetPopUp from './CreateDataSetPopUp';
import { Button } from '@mui/material';
function Dataset() {

  
  let [createpopup,setCreatepopup] = useState(false)
  let [datasets,setDatasets] = useState([])


  useEffect(() => {
  
  }, [])


  return (
    <div>
      <div>
      <Button variant="outlined"
      onClick={e=>setCreatepopup(true)}
      >Add Datset</Button>
      </div>
      <div>

      </div>
      {createpopup && <CreateDataSetPopUp
      close = {setCreatepopup}
      ></CreateDataSetPopUp>}
    </div>
  )
}

export default Dataset
