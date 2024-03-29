import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "../Services/AxiosConfig";
import { useEffect } from "react";
import { authservice } from "../Environment";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import { Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { AxiosWithoutHeader } from "../utilities/Utility";
export function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" to="//https://prolifics.com/">
                Prolifics
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {

    const [loginErr, setLoginErr] = React.useState(false);
    const [fieldsErr, setfieldsErr] = React.useState({ email: "", password: "" });
    const [loading, setLoading] = React.useState(false);
    const { setAuth, auth } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        setfieldsErr({ email: "", password: "" });
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email").trim();
        const password = data.get("password").trim();
        if (email && password) {
            setLoading(true);
            try {
                const response = await AxiosWithoutHeader.post(
                    authservice + "/authentication/login",
                    {
                        username: data.get("email"),
                        password: data.get("password"),
                    },
                    //{
                    //    headers: {
                    //        Authorization: "Basic c2FuanU6ZGV2cmFiYml0",
                    //        "Content-Type": "application/json",
                    //    },
                    //}
                );
                const token = response?.data?.token;
                localStorage.setItem("token", token);
                const userInfo = await axios.get(
                    authservice + "/authentication/userInfo",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const info = userInfo?.data?.info;
                const user = info?.ssoId;
                const password = info?.password;
                const role = info?.role;
                const userId = info?.id;

                setAuth({
                    user: user,
                    password: password,
                    roles: role,
                    userId: userId,
                    info: info,
                    token: token,
                });
                setLoading(false);
            } catch (err) {
                const error = err?.response?.data;
                setLoginErr({
                    state: true,
                    message: error ? error?.message : "Network Error !!",
                    status: error?.status,
                });
            }
            setLoading(false);
        } else {
            !email &&
                setfieldsErr((ps) => {
                    return { ...ps, email: "username is required" };
                });
            !password &&
                setfieldsErr((ps) => {
                    return { ...ps, password: "password is required" };
                });
        }
    };

    useEffect(() => {
        // auth?.user && navigate(from, { replace: true });
        auth?.user &&
            auth?.roles &&
            navigate("/Favourite-Projects", { state: "recentProjects" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
        // auth?.user && navigate(from, { replace: true });
        auth?.user &&
            auth?.roles &&
            navigate("/Favourite-Projects", { state: "recentProjects" });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarNotify
                open={loginErr?.state}
                close={setLoginErr}
                msg={loginErr?.message}
                severity="error"
            />
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid item xs={false} sm={12} md={7} className="loginImg">
                    <img src="logo-light.png" className="loginLogo" alt="" />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={5}
                    component={Paper}
                    className="loginForm"
                    square
                >
                    <Box>
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
                            {loginErr?.status === 401 && (
                                <Alert severity="warning">Credentials are wrong !!</Alert>
                            )}
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                id="email"
                                label="UserId"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                error={fieldsErr?.email || loginErr?.status === 401}
                                helperText={fieldsErr?.email}
                            />
                            <TextField
                                margin="normal"
                                size="small"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                error={fieldsErr?.password || loginErr?.status === 401}
                                helperText={fieldsErr?.password}
                            />

                            <LoadingButton
                                type="submit"
                                size="small"
                                fullWidth
                                variant="contained"
                                loading={loading}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </LoadingButton>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
