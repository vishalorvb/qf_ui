import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
export default function ExecutionToolbar () {

    return (
        <Paper>
            <select>
                <option>testing</option>
                <option>Staging</option>
                <option>current</option>
            </select>
            <select>
                <option>testing</option>
                <option>Staging</option>
                <option>current</option>
            </select>

            <Button  variant="contained" >+ Features</Button>
            <Button  variant="contained" >Execute</Button>
            <Button  variant="contained" >Generate</Button>

            <label>Regenerate Scripts:</label>
            <input type='checkbox'></input>

        </Paper>
    )
}