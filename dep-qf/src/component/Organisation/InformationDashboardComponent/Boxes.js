import React from 'react'
import { Button, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function Boxes() {
    return (
        <div style={{}}>
            {/* <h4>How to use CardComponent in ReactJS?</h4> */}
            <Card sx={{ Width: '100px' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 20 }} align='right' color="text.secondary" gutterBottom>
                        Total Projects
                    </Typography>
                    <Typography variant="h3" align='right' component="div">
                        41
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton ><OpenInNewIcon /></IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Boxes