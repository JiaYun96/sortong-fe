import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { ToastContainer, toast } from "react-toastify"
import { useHistory } from "react-router-dom"
import axios from "axios"

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

export default function Register(props) {
  const classes = useStyles()
  let history = useHistory()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [regResponse, setRegResponse] = useState("")
  const [regUserId, setRegUserId] = useState("")

  useEffect(() => {
    props.handleVisibility('none')
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/v1/user/register`, {
      fullName,
      email,
      password,
      confirmPassword
    })
      .then(response => {
        if (response && response.data) {
          const { userId, message } = response.data;
          setRegUserId(userId);
          setRegResponse(message);
          setTimeout(() => {
            history.push("/login")
          }
            , 3700)
          toast.success(message)
        }
      })
      .catch(err => {
        const { success, message } = err.response.data;
        if (success === false) setRegResponse(message)
        toast.warning(err.response.data.message);
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>

        <Avatar className={classes.avatar}>
          <PersonAddIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
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
                // autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="confirmPassword"
                id="confirmPassword"
                // autoComplete="current-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="http://localhost:3000/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>

      <Box mt={5}>
        <Copyright />
      </Box>
      <ToastContainer
        autoClose={4000}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </Container>
  );
}