import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <img src="/somethingwentwrong.png" alt="..." />

      <h1>Something went wrong !</h1>
      <Button onClick={goHome} size="large" variant="contained">
        home
      </Button>
    </Stack>
  );
}
