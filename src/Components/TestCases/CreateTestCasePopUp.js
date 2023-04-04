// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import { Stack } from "@mui/system";
// import { TextFieldElement, useForm } from "react-hook-form-mui";
// import * as yup from "yup";
// import axios from "../../api/axios";

// function CreateTestCasePopUp(props) {
//   const { projectId, applicationId, applicationType, open, close, setSnack } =
//     props;
//   const schema = yup.object().shape({ testcaseName: yup.string().required() });
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const handleClose = () => {
//     reset();
//     close(false);
//   };

//   const onSubmitHandler = (params) => {
//     console.log(params);
//     console.log({ projectId, applicationId });
//     const data = {
//       module_id: applicationId,
//       testcase_name: params.testcaseName,
//       testcase_description: params.testcasedesc,
//       project_id: projectId,
//     };
//     axios.post(`/qfservice/webtestcase/CreateWebTestCase`, data).then((res) => {
//       console.log(res);
//       res?.data?.status === "SUCCESS" && setSnack(true);
//       res?.data?.status === "SUCCESS" && handleClose();
//     });
//   };
//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle className="dialogTitle">Create Test Case</DialogTitle>
//       <form onSubmit={handleSubmit(onSubmitHandler)}>
//         <DialogContent>
//           <Stack spacing={1} mt={1}>
//             <TextFieldElement
//               id="testcase-name"
//               label="Name"
//               variant="outlined"
//               size="small"
//               fullWidth
//               name="testcaseName"
//               control={control}
//             />
//             <TextFieldElement
//               id="testcase-desc"
//               label="Description"
//               variant="outlined"
//               size="small"
//               fullWidth
//               name="testcasedesc"
//               control={control}
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button variant="contained" type="submit">
//             Save
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// }

// export default CreateTestCasePopUp;
