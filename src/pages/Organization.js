import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import { MenuItem } from "@mui/material";
import useHead from "../hooks/useHead";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import TableActions from "../../src/CustomComponent/TableActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { postVal } from "./UpdateOrganization";
import moment from "moment";
import { userservice } from "../Environment";
const Organization = () => {
  const { auth } = useAuth();
  const { setHeader } = useHead();
  const navigate = useNavigate();
  const [organizationData, setOrganizationData] = useState([]);

  const columns = [
    {
      field: "company",
      headerName: "Organization Name",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <span
            style={{ color: "rgb(0, 159, 238)", cursor: "pointer" }}
            onClick={(e) => {
              // console.log(param.row);
              navigate("/Organization/OrganizationDashboard", {
                state: { orgId: param.row.id, company: param.row.company },
              });
            }}
          >
            {param.row?.company}
          </span>
        );
      },
    },
    {
      field: "phone",
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
          <TableActions
            heading={moment(param.row?.last_modified).format("DD/MM/yyyy")}
          >
            <MenuItem
              onClick={(e) => {
                console.log(param.row);
                postVal.company = param.row.company;
                postVal.phone = param.row.phone;
                postVal.organization_id = param.row.id;
                postVal.firstName = param.row.firstName;
                postVal.lastName = param.row.lastName;
                postVal.email = param.row.email;
                console.log(postVal);
                navigate("/Organization/UpdateOrganization");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getOrganization(params) {
    try {
      axios({
        method: "get",
        url: `${userservice}/qfuserservice/user/orgdetails`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      }).then((res) => {
        console.log(res.data.info[0]);
        setOrganizationData(res?.data?.info);
        if ((res.data.message = "Organization Details found.")) {
          console.log("first");
          // setAddSuccessMsg(true);
          // setTimeout(() => {
          //   setAddSuccessMsg(false);
          // }, 3000);
        }
      });
    } catch (error) {
      console.error(error); // handle error
    }
  }

  return (
    <Table
      columns={columns}
      hideSearch={false}
      rows={organizationData}
      getRowId={(row) => row?.id}
    />
  );
};

export default Organization;
