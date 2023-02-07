import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Prolifics
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        "http://10.11.12.242:8080/qfauthservice/authentication/login",
        {
          username: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: {
            Authorization: "Basic c2FuanU6ZGV2cmFiYml0",
            "Content-Type": "application/json",
          },
        }
      );
      const token = response?.data?.token;
      localStorage.setItem("token", token);

      const userInfo = await axios.get(
        "http://10.11.12.242:8080/qfauthservice/authentication/userInfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const info = userInfo?.data?.info;
      const user = info?.ssoId;
      const password = info?.password;
      const role = [info?.role];
      // const info = {};
      // const user = "Ranga";
      // const password = "Ranga";
      // const role = [2];

      setAuth({
        user: user,
        password: password,
        roles: role,
        info: info,
        token: token,
      });
    } catch (err) {}
  };

  useEffect(() => {
    auth?.user && navigate(from, { replace: true });
  }, [auth]);

  useEffect(() => {
    auth?.user && navigate(from, { replace: true });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(login.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: "white",
            backgroundSize: "60%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={2} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography component="h1" variant="h3">
              Welcome back
            </Typography>
            <br />
            <Typography component="h1" variant="subtitle1">
              Please enter Your Credentials
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
