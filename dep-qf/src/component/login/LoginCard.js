import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const baseUrl = 'http://10.11.12.141:9191'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://prolifics.com/">
        Prolifics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginCard() {

  const [emptyEmail, setEmptyEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  const postUserDetails = (data) => {
    if (data.userName !== '' && data.password !== '') {
      setEmptyEmail(false);
      setEmptyPassword(false);
      setIncorrect(false);
      axios({
        method: "post",
        url: baseUrl + `/LayoutMS/auth/login`,
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.success === true) {
            navigate("/recent-project");

            localStorage.setItem('expiry', Date.now() + 1800000);

            localStorage.setItem('resId', response.data.id);
            localStorage.setItem('resName', response.data.resourceName);
            localStorage.setItem('token', response.data.success);
            localStorage.setItem('jwtToken', response.data.jwtToken);
            localStorage.setItem('email', response.data.email);
          } else {
            setIncorrect(true);
          }
        })
        .catch(function (response) {
          console.log(response);
        });
    }

    else {
      //   setValidation(classes.textField);
      setEmptyEmail(() => data.userName === '' ? true : false);
      setEmptyPassword(() => data.password === '' ? true : false);

    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/recent-project");
    // const data = new FormData(event.currentTarget);
    // postUserDetails({ userName: data.get('email'), password: data.get('password') })
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            padding: 3,
            borderRadius: '16px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <img src="prolificstesting_logo.png" alt="logo" width={150} />
          </Avatar>
          {/* <img src="prolificstesting_logo.png" alt="logo" width={150} /> */}
          <Typography component="h1" variant="h5">
            Quality Fusion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emptyEmail || incorrect}
              helperText={emptyEmail ? 'Please enter the email id' : incorrect ? 'enter valid id' : ''}
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
              error={emptyPassword || incorrect}
              helperText={emptyPassword ? 'Please enter the password' : incorrect ? 'enter valid password' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
