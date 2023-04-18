
import { Grid, Button, IconButton, Tooltip  } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from '../../CustomComponent/Table'
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { SelectElement, useForm } from 'react-hook-form-mui';
import axios from '../../api/axios';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RuntimeVariable from './RuntimeVariable';
import AddTestSetLinkProject from './AddTestSetLinkProject';
import ConfirmPop from '../../CustomComponent/ConfirmPop';
import { postVal } from './AddTestSetLinkProject';
import LinkFeatureMenu from './LinkFeatureMenu';
const LinkProjectExecution = ({projectId , applicationId ,}) => {
  const [execLoc, setExecLoc] = useState("local");
  const [execEnvList, setExecEnvList] = useState([]);
  const [openRuntimeVar, setOpenRuntimeVar] = React.useState(false);
  const [openTestsetPopup, setOpenTestsetPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [testsetEditData , setTestsetEditData] = useState();


  const schema = yup.object().shape({
    executionLoc: yup.string().required(),
    buildenvName: yup.string().required(),
    browser: yup.array().required(),
    commitMsg: execLoc !== "local" && yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  useEffect(() => {
    axios
        .get(
        //   `/qfservice/execution-environment?module_id=${applicationId}&project_id=${projectId}`
          `/qfservice/execution-environment?module_id=${768}&project_id=${467}`

        )
        .then((resp) => {
          const execEnv = resp?.data?.data;
          setExecEnvList(() => {
            return execEnv.map((ee) => {
              return { id: ee.value, label: ee.name };
            });
          });
        });
  }, [])
  

    const tbData =[
        {
            id : 1,
            name:"link-project-execution1",
            description:"link-project-execution1"
        },
        {
            id : 2,

            name:"link-project-execution1",
            description:"link-project-execution1"
        },
        {
            id : 3,
            name:"link-project-execution1",
            description:"link-project-execution1"
        }
    ]

    const columns = [
        {
          field: "name",
          headerName: "Testset",
          flex: 2,
          sortable: false,
          align: "left",
        },
        {
          field: "description",
          headerName: "Description",
          flex: 2,
          sortable: false,
          align: "left",
        },
        {
          field: "Action",
          headerName: "Action",
          flex: 2,
          sortable: false,
          align: "left",
          renderCell: (param) => {
            return (
              <>
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => { 
                      postVal.testset_name = param.row.name
                      postVal.testset_desc = param.row.description
                      setTestsetEditData(param)
                      setOpenTestsetPopup(true) }}
                  >
                    <EditIcon style={{ color: "black" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                    //   setSpecificationId(param.row.specificationId);
                      setConfirm(true);
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </>
            );
          },
        },
      
      ];

  return (
    <>
    <Grid  container
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    spacing="1"
    mt={1}>
    <Grid item md={8} container spacing={1} display="flex">
    <Grid item  md = {2}>
        <SelectElement
            name="executionLoc"
            label="Execution Location"
            size="small"
            fullWidth
            control={control}
            onChange={(e) => setExecLoc(e)}
            options={execEnvList}
          /></Grid>
          <Grid item md = {2}> <LinkFeatureMenu/> </Grid>
    {/* <Grid item md = {2}> <Button fullWidth variant="contained" onClick={() => setOpenRuntimeVar(true)} style={{backgroundColor : "#009fee"}}>Add Variable</Button></Grid> */}
    <Grid item md = {2}> <Button fullWidth variant="contained"  onClick={() => setOpenTestsetPopup(true)} style={{backgroundColor : "#009fee"}}>Add Testset</Button></Grid>
    </Grid>
    <Grid item md={1.3}>
    <Button fullWidth variant="contained" style={{backgroundColor : "#009fee"}}>Execute</Button>
  </Grid>
  </Grid>
  <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          columns={columns}
          hideSearch={true}
          rows={tbData}
          getRowId={(row) => row.id}
        />
      </div>
      {/* {openRuntimeVar && <RuntimeVariable  open={openRuntimeVar} close={setOpenRuntimeVar}  />} */}
      {openTestsetPopup && <AddTestSetLinkProject setTestsetEditData={setTestsetEditData} testsetEditData={testsetEditData} applicationId={applicationId} projectId={projectId}  open ={openTestsetPopup} close={setOpenTestsetPopup}/>}

      {confirm && (
        <ConfirmPop
          open={true}
          handleClose={(e) => setConfirm(false)}
          heading={"Delete Configuration"}
          message={"Are you sure you want to delete the Configuration ?"}
         // onConfirm={(e) => deleteApiRequest(specificationId)}
        ></ConfirmPop>
      )}
 </>


  )
}

export default LinkProjectExecution