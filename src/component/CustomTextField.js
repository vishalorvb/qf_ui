import styled from '@emotion/styled';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField, {
    name: "StyledTextField",
})({
    "& .MuiInputBase-root": {
        height: '2em'
    }
});
