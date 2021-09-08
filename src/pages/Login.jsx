import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        SORTONG
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export function Login({ auth, setAuth, ...props }) {
  const classes = useStyles();
    let history = useHistory();
  
    // const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = () => {
      console.log(props);
      console.log(auth);
      axios
        .post(`${process.env.REACT_APP_BACKEND}/api/v1/user/login`, {
          username,
          password,
        })
        .then(response => {
          console.log(response);
          props.cookies.set("auth_token", response.data.token, { path: "/" });
  
          toast("login successful, user is found");
          window.location.reload();
        })
        .catch(err => {
          toast(err.response.data.message);
        })
        .finally(async () => {
          await history.push("/dashboard");
        });
    };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          
        <Avatar className={classes.avatar}>
          <FaceIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Log In
        </Typography>

        <form className={classes.form} noValidate>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
            </Grid>

        </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Log In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>

    </Container>
  );
}

export default withCookies(Login);