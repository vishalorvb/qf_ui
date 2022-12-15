


import { Grid, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import React from 'react'

function ActionExecution() {
    return (
        <div>
            This is action execution
            <div className="input-form">
                <Grid
                    columnSpacing={5}
                    rowSpacing={5}
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="left"
                    sx={{ padding: "5px" }}
                >
                    <Grid item xs={4} >
                        <label htmlFor="" style={{ display: 'inline' }}>Work Flow:</label>
                        <input type="text" style={{ display: 'inline', margin: '5px', padding: '5px', width: '70%' }} />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="" style={{ display: 'inline' }}>Users:</label>
                        <input type="text" style={{ display: 'inline', margin: '5px', padding: '5px', width: '70%' }} />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="" style={{ display: 'inline' }}>From Date:</label>
                        <input type="date" style={{ display: 'inline', margin: '5px', padding: '5px', width: '70%' }} />
                    </Grid>
                    <Grid item xs={4} >
                        <label htmlFor="" style={{ display: 'inline' }}>To Date:</label>
                        <input type="date" style={{ display: 'inline', margin: '5px', padding: '5px', width: '70%' }} />
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </div>
            <div className="table-data">
                <TableContainer component={Paper}>
                    <Table stickyHeader={true}>
                        <TableHead>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Automation Type</TableCell>
                                <TableCell>Fav</TableCell>
                                <TableCell align='center'>Icons</TableCell>
                            </TableRow>
                        </TableHead>                        
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default ActionExecution
