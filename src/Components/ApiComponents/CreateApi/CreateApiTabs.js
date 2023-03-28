import { Tab, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import PropTypes from 'prop-types';
import ApiAuthorization from './ApiAuthorization';
import ApiHeader from './ApiHeader';
import ApiParam from './ApiParam';
import ApiBody from './ApiBody';
import ApiLinktab from './ApiLinktab';
import ApiResponse from './ApiResponse';

function CreateApiTabs({ApiDetails}) {
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  return (
    <div>
       <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Authorozation" {...a11yProps(0)} />
                        <Tab label="Headers" {...a11yProps(1)} />
                        <Tab label="Params" {...a11yProps(2)} />
                        <Tab label="Body" {...a11yProps(3)} />
                        <Tab label="API Link Parameters" {...a11yProps(4)} />
                        <Tab label="Response Parameters" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ApiAuthorization
                    ApiDetails = {ApiDetails}
                    ></ApiAuthorization>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ApiHeader
                    ApiDetails = {ApiDetails}
                    ></ApiHeader>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ApiParam
                  ApiDetails = {ApiDetails}
                  ></ApiParam>
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ApiBody></ApiBody>
                </TabPanel>
                <TabPanel value={value} index={4}>
                   <ApiLinktab
                   ApiDetails = {ApiDetails}
                   ></ApiLinktab>
                </TabPanel>
                <TabPanel value={value} index={5}>
                   <ApiResponse
                   ApiDetails = {ApiDetails}
                   ></ApiResponse>
                </TabPanel>
            </Box>
    </div>
  )
}

export default CreateApiTabs
