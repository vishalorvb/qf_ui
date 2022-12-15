import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { useState } from 'react';

export default function ListItems(props) {

  const { openDrawer, setDrawerOpen } = props;

  const [projectSub, setProjectSub] = useState(false);
  const [executionsub, setExecutionSub] = useState(false);
  const [organisationSub, setOrganisationSub] = useState(false);

  return (
    <React.Fragment>
      <List component="nav">
        <ListItemButton onClick={() => { (!openDrawer) && setDrawerOpen(true); setProjectSub(ps => !ps) }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Project" />
          {projectSub ? <ExpandLess onClick={() => setProjectSub(false)} /> : <ExpandMore onClick={() => setProjectSub(true)} />}
        </ListItemButton>
        <Collapse in={projectSub} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Create" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Favorites" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => { (!openDrawer) && setDrawerOpen(true); setExecutionSub(ps => !ps) }}>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <ListItemText primary="Execution" />
          {executionsub ? <ExpandLess onClick={() => setExecutionSub(false)} /> : <ExpandMore onClick={() => setExecutionSub(true)} />}
        </ListItemButton>
        <Collapse in={executionsub} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Start" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="In Progress" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Recent" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={() => { (!openDrawer) && setDrawerOpen(true); setOrganisationSub(ps => !ps) }}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Organisation" />
          {organisationSub ? <ExpandLess onClick={() => setOrganisationSub(false)} /> : <ExpandMore onClick={() => setOrganisationSub(true)} />}
        </ListItemButton>
        <Collapse in={organisationSub} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Information/Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Report" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </React.Fragment>
  )
}