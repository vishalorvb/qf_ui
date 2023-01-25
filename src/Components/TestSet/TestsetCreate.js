import React from 'react';
import Table from '../CustomComponent/Table';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function TestsetCreate() {

    const addUserHandler = (e) => {
        
    }

  return (
    <div>
        <Paper>
        <div className="recenttable" style={{ flot: "right", marginBottom: "10px" }}>
          <Button style={{ flot: "right" }} variant="contained" endIcon={<AddOutlinedIcon />} onClick={addUserHandler}>Create Testset</Button>
        </div>
        <div className="datatable" style={{ marginTop: "20px" }}>
          <Table
            columns={columns}
            rows={testsetObject}
            // hidefooter={false}
            getRowId={row => row.testset_id}
          />
        </div>
      </Paper>
    </div>
  )
}

export default TestsetCreate