
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Authorization from './Authorization';
import Header from './Header';
import Param from './Param';
import ApiLink from './ApiLink';
import Body from './Body';
import Response from './Response';
function ApiTabs() {

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
                    <Authorization></Authorization>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Header></Header>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Param></Param>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Body></Body>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <ApiLink></ApiLink>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <Response></Response>
                </TabPanel>
            </Box>
        </div>
    )
}

export default ApiTabs
