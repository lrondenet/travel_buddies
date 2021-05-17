import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import  { Redirect, withRouter } from 'react-router-dom'



const styles = (theme) => ({
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
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class Login extends React.Component {
  state = {
    username: '',
    password: '',
    isError: false,
    isSuccess: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          username: this.state.username,
          password: this.state.password
        }
      )
    }
    fetch('http://localhost:8000/token/', requestOptions).then((response) => { 
      if (!response.ok) {
        this.setState({
          isError: true
        }) 
      }
      if (response.ok) {
        this.setState({
          isSuccess: true
        })
      }
      response.json()
        .then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user_id);
          localStorage.setItem('email', data.email);
        })
    })
  }
  
  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  componentDidMount() {
      const { history } = this.props
      async function validateToken() {
        const token = localStorage.getItem('token') 
        const response = await fetch('http://localhost:8000/trips/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + token,
            },
        });
        if (response.ok) {
          console.log('token is good')
          history.push('/dashboard')
          return
          // setLoggedIn(true);
          // return
        }
        console.log('token is bad')
        history.push('/login')
    }
    validateToken()
    console.log('component mounted!')
    const token = localStorage.getItem('token')
    console.log(token)
  }


  render() {
    const { classes } = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {this.state.isError ? (
            <Alert severity="error">
              There is an error!
            </Alert>
          ) : (
            <div></div>
          )}
          {this.state.isSuccess ? (
            <React.Fragment>
              <Alert severity="success">
                You signed in!
              </Alert>
              <Redirect to='/dashboard'>

              </Redirect>
            </React.Fragment>
          ) : (
            <div></div>
          )}
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
  }
}
export default withRouter(withStyles(styles)(Login))


