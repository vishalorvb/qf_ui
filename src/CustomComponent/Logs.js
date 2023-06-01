import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button} from '@mui/material';

const Logs = () => {
  const [logs, setLogs] = useState('');
  const [buildData,setBuilddata] = useState()
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const username = 'qfuser';
      const password = 'Pro09!@';
      const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
      const response1 = await axios.get('http://10.11.12.243:8081/job/Qf_react/api/json?pretty=true',{
        headers: {
          Authorization: authHeader,
        }
      })
      setBuilddata(response1?.data)
      let builds = response1?.data.builds;
      let buildNumber = builds[0].number;
      const url = `http://10.11.12.243:8081/job/Qf_react/${buildNumber}/logText/progressiveHtml`;
        try {
          while (true) {
            const response2 = await axios.get(url,{
              headers: {
                      Authorization: authHeader,
                    },
            });
            setLogs(response2.data);
            const html = await response2?.data;
            if (html.includes('Finished: SUCCESS') || html.includes('Finished: FAILURE')) {
              break;
            }
            console.log(html);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
         catch (error) {
          console.error('Error fetching Jenkins logs:', error);
        }
    } catch (error) {
      console.error('Error fetching Jenkins data:', error);
    }
  };


  return (
    <div>
      <label htmlFor="name"><strong>Build Name :</strong></label><Button id="name">{buildData?.name}</Button><br/>
      <label htmlFor="url"><strong>URL :</strong></label><Button id="url">{buildData?.url}</Button>
      <pre>{logs}</pre>
    </div>
  );
};

export default Logs;
