import { Skeleton as Skel } from "@mui/material";
import Stack from "@mui/material/Stack";
export default function Skeleton() {
  return (
    <Stack spacing={2}>
      <Skel variant="rectangular" width={200} height={30} animation="wave" />
      <Skel variant="rectangular" width={1500} height={30} animation="wave" />
      <Skel variant="rectangular" width={1500} height={30} animation="wave" />
      <Skel variant="rectangular" width={1500} height={30} animation="wave" />
      <Skel variant="rectangular" width={1500} height={30} animation="wave" />
    </Stack>
  );
}
