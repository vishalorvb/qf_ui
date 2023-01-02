// import React, { useState,useEffect } from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { Autocomplete, Box, Grid, ListItem } from '@mui/material';
// import Boxes from './Boxes';
// import { getAutomationType } from '../../ProjectModule/Api';
// import { Container } from '@mui/system';


// export default function Dashboard() {

//     const [type, setType] = useState("");
//     const [age, setAge] = React.useState('');
//     const [autoTypeId, setAutoTypeId] = useState('');
//     const [autoTypeObject,setAutoTypeObject] = useState([]);
// console.log(autoTypeObject);
//     const handleChange = (event) => {
//         setAge(event.target.value);
//     };

//     const TypeChangeHandler = (event) => {
//         setType(event.targrt.value);
//     }

//     useEffect(() => {
//         getAutomationType(setAutoTypeObject);
//     }, [])
    
//     console.log(autoTypeId);
//     return (
//         <div>
//             <Container component={'div'} maxWidth={false} sx={{ display: "flex", flexDirection: 'row', flexWrap: 'wrap', marginTop: "10px", justifyContent: 'flex-start' }} >
                // <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '10px' }} >
                //     <Grid item xs={6} sm={6} md={5} xl={4}><label>Automation Type <span className="importantfield" >*</span>:</label></Grid>
                //     <Grid item xs={6} sm={6} md={6.5} xl={7}>
                //         <Autocomplete
                //             size="small"
                //             options={autoTypeObject}
                //             getOptionLabel={(option) => option.name}
                //             onChange={(e, value) => {
                //                 setAutoTypeId(value.id)
                //             }}
                //             noOptionsText={'User not found'}
                //             renderInput={(params) =>
                //                 <div ref={params.InputProps.ref}>
                //                     <input type="text" {...params.inputProps} placeholder="Please Select" />
                //                 </div>
                //             }
                //         />
                //     </Grid>
                // </Grid>
//             </Container>

//             <Box sx={{ flexGrow: 1 }}>
//                 <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                     {Array.from(Array(6)).map((_, index) => (
//                         <Grid item xs={2} sm={4} md={4} key={index}>
//                             {Boxes}
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Box>
//             {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//                 <Grid item xs={4}>
//                     <ListItem><Boxes /></ListItem>
//                 </Grid>
//             </Grid> */}
//         </div>
//     )
// }
import * as React from 'react';
import { useState,useEffect } from 'react';
import { Box } from "@mui/system"
import { Card, CardActions, CardContent, Typography, IconButton, Autocomplete, Tooltip } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ForwardIcon from '@mui/icons-material/Forward';
import Grid from '@mui/material/Grid';
import { getAutomationType } from '../../ProjectModule/Api';

export default function Dashboard() {

    const [autoTypeId, setAutoTypeId] = useState('');
    const [autoTypeObject,setAutoTypeObject] = useState([]);
    const [totalProject, setTotalProject] = useState(0);
    const [dataSets, setdataSets] = useState(0);
    const [totalSprint, settotalSprint] = useState(0);
    const [testCases, setTestCases] = useState(0);
    const [workFlow, setWorkFlow] = useState(0);
    const [executionStatus, setExecutionStatus] = useState(0);
    const header = ["Total Projects", "Data Sets", "Total Sprint","Test Cases","Work Flow","Execution Status"];
    const data = [totalProject,dataSets,totalSprint,testCases,workFlow,executionStatus];

    
    
    useEffect(() => {
        getAutomationType(setAutoTypeObject);
    }, [])

    const crd = (index) => {
        return (
            <Card sx={{ Width: '100px' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20, backgroundColor: "rgba(137,196,244,1)" }} align='center' color="text.secondary" gutterBottom>
                        {header[index]}
                    </Typography>
                    <Typography variant="h3" align='left' component="div">
                        {data[index]}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tooltip title="Go">
                        <IconButton ><ForwardIcon style={{width:"50px", height:"50px"}}/></IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }

    return (
        <div>
            <Grid container item xs={12} sm={6} md={4} xl={4} sx={{ marginBottom: '20px' }} >
                <Grid item xs={6} sm={6} md={5} xl={4}><label>Automation Type <span className="importantfield" >*</span>:</label></Grid>
                <Grid item xs={6} sm={6} md={6.5} xl={7}>
                    <Autocomplete
                        size="small"
                        options={autoTypeObject}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => {
                            setAutoTypeId(value.id)
                        }}
                        noOptionsText={'User not found'}
                        renderInput={(params) =>
                            <div ref={params.InputProps.ref}>
                                <input type="text" {...params.inputProps} placeholder="Please Select" />
                            </div>
                        }
                    />
                </Grid>
            </Grid>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            {crd(index)}
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}