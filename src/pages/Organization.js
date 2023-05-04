
import React, { useEffect, useState } from 'react'
import Table from '../CustomComponent/Table'
import { MenuItem } from '@mui/material';
import useHead from '../hooks/useHead';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import TableActions from "../../src/CustomComponent/TableActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { postVal } from './AddOrganization';
import moment from 'moment';

const Organization = () => {

  const { auth } = useAuth();
  const { setHeader } = useHead();
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] = useState([]);



  const columns = [
    {
      field: "organization_name",
      headerName: "Organization Name",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <span style={{color:"rgb(0, 159, 238)"}}>{param.row?.organization_name}</span>
        );
      },
    },
    {
      field: "phone_number",
      headerName: "Contact",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "last_modified",
      headerName: "Updated",
      flex: 3,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <TableActions heading={ moment(param.row?.last_modified).format("DD/MM/yyyy")}>
            <MenuItem
              onClick={(e) => {
                console.log(param.row);
                postVal.company = param.row.organization_name;
                postVal.phone =  param.row.phone_number;
                postVal.organization_id = param.row.organization_id;
                console.log(postVal);
                navigate("/AddOrganization");
              }}
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>
          </TableActions>
        );
      },
    },

  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Organization",
      };
    });

  }, []);

  useEffect(() => {
    getOrganization()
  }, [])


  function getOrganization(params) {
    try {
      axios({
        method: 'get',
        url: `/qfuserservice/user/orgdetails`,
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }

      }).then(res => {
        console.log(res.data.info[0]);
        setOrganizationData(res?.data?.info)
        if (res.data.message = "Organization Details found.") {
          console.log("first")
          // setAddSuccessMsg(true);
          // setTimeout(() => {
          //   setAddSuccessMsg(false);
          // }, 3000);
        }
      })

    } catch (error) {
      console.error(error); // handle error
    }
  };

  return (
    // <h1>dfdsfds</h1>  
    <Table
      columns={columns}
      hideSearch={false}
      rows={organizationData}
      getRowId={(row) => row?.organization_id}
    />
  )
}

export default Organization