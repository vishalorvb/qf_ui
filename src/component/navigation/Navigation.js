import './navigation.scss';
import NavItems from "./NavigationRenderer"

import List from '@mui/material/List';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PeopleIcon from '@mui/icons-material/People';


export default function Navigation({openDrawer,setDrawerOpen}) {


    const navItems = [
        {
            item:"Project",
            icon:<DashboardIcon/>,
            children:[
                {
                    item:"Recent",
                    route:"/recent-project"
                },
                {
                    item:"Favourite",
                    route:"/favorite"
                },
                {
                    item:"Search",
                    route:"/search"
                },
            ]
        },
        {
            item:"Execution",
            icon:<AccountTreeIcon/>,
            children:[
                {
                    item:"Recent",
                    route:"/recent-execution"
                },
                {
                    item:"Search",
                    route:"/search-execution"
                },
            ]
        },
        {
            item:"Organization",
            icon:<PeopleIcon/>,
            children:[
                {
                    item:"Information/Dashboard",
                    route:"/Dashboard"
                },
                {
                    item:"Users",
                    route:"/users"
                },
                {
                    item:"Report",
                    route:"/report"
                },
                {
                    item:"Settings",
                    route:"/settings"
                }
            ]
        },
    ];

    const navigation = navItems.map(nav=>{return <NavItems key={nav.item} nav={nav} openDrawer={openDrawer} setDrawerOpen={setDrawerOpen}/>})

    return<List>{navigation}</List>
}