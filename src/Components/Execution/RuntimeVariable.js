import { yupResolver } from "@hookform/resolvers/yup";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { Divider, Grid, Typography } from '@mui/material'
import axios from "../../api/axios";

function RuntimeVariable(props) {
    const { projectId, applicationId, applicationType, open, close, setSnack } =
        props;
    const schema = yup.object().shape({ testcaseName: yup.string().required() });
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });
    const handleClose = () => {
        reset();
        close(false);
    };

    const onSubmitHandler = (params) => {
        console.log(params);
        console.log({ projectId, applicationId });
        const data = {
            module_id: applicationId,
            testcase_name: params.testcaseName,
            testcase_description: params.testcasedesc,
            project_id: projectId,
        };
        axios.post(`/qfservice/webtestcase/CreateWebTestCase`, data).then((res) => {
            console.log(res);
            res?.data?.status === "SUCCESS" && setSnack(true);
            res?.data?.status === "SUCCESS" && handleClose();
        });
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle className="dialogTitle">RunTime Variables</DialogTitle>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <DialogContent>
                <Typography variant="subtitle1"><b style={{ color: "#5C6780", fontSize: "20px" }}>Variables</b></Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="{key:value}"
                        style={{ width: 550 , height:300, marginTop:"10px", padding:"10px"}}
                    />
                </DialogContent>
                <DialogActions>
                <Button variant="contained" type="submit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default RuntimeVariable;
