import { withStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert';

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#33ab9f',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
})

class Profile extends React.Component {
  state = {
    profile: {},
    isLoaded: false,
    errorMessage: ''
  }

  componentDidMount() {
    const user_id = localStorage.getItem('user_id')
    fetch('http://localhost:8000/users/' + user_id)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR')
        }
        return response.json()
      })
      .then((data) => {
        this.setState({
          profile: data,
          isLoaded: true,
        })
      })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    let profile = this.state.profile
    if (name === 'firstName') {
      profile.user.first_name = value
    }
    if (name === 'lastName') {
      profile.user.last_name = value
    }
    if (name === 'username') {
      profile.user.username = value
    }
    if (name === 'email') {
      profile.user.email = value
    }
    if (name === 'address1') {
      profile.address1 = value
    }
    if (name === 'address2') {
      profile.address2 = value
    }
    if (name === 'city') {
      profile.city = value
    }
    if (name === 'country') {
      profile.country = value
    }
    if (name === 'zipcode') {
      profile.zipcode = value
    }
    if (name === 'phone') {
      profile.phone = value
    }
    if (name === 'password') {
      profile.user.password = value
    }
    // console.log(profile)
    this.setState({
      profile: profile
    })
  }

  handleSubmit = (event) => {
    this.setState({
      errorMessage: ''
    })
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')
    event.preventDefault()
    // console.log(this.state.profile.user.password)
    // console.log(this.state.profile.user.password === '')
    if (this.state.profile.user.password === undefined) {
        this.setState({
          errorMessage: 'password is required!'
        })
    }
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      },
      body: JSON.stringify({
          user: {
              first_name: this.state.profile.user.first_name,
              last_name: this.state.profile.user.last_name,
              username: this.state.profile.user.username,
              email: this.state.profile.user.email,
              password: this.state.profile.user.password
          },
            address1: this.state.profile.address1,
            address2: this.state.profile.address2,
            city: this.state.profile.city,
            country: this.state.profile.country,
            zipcode: this.state.profile.zipcode,
            phone: this.state.profile.phone
      })
    }
    fetch('http://localhost:8000/users/' + user_id + '/', requestOptions)
        .then(response =>response.json())
  }


  render() {
    const { classes } = this.props
    const { isLoaded, profile } = this.state

    if (!isLoaded) {
        return <div>Loading...</div>
    }
    else {
        return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Profile
                </Typography>
                {this.state.errorMessage !== '' ? (
                  <Alert severity="error">
                  {this.state.errorMessage}
                  </Alert>
                  ) : (
                  <div></div>
                )}
                <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
                >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        defaultValue={profile.user.first_name}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        defaultValue={profile.user.last_name}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        defaultValue={profile.user.username}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        defaultValue={profile.user.email}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="address"
                        name="address1"
                        variant="outlined"
                        fullWidth
                        id="address1"
                        label="Address1"
                        autoFocus
                        defaultValue={profile.address1}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="address"
                        name="address2"
                        variant="outlined"
                        fullWidth
                        id="address2"
                        label="Address2"
                        autoFocus
                        defaultValue={profile.address2}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="city"
                        name="city"
                        variant="outlined"
                        fullWidth
                        id="city"
                        label="City"
                        autoFocus
                        defaultValue={profile.city}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="country"
                        name="country"
                        variant="outlined"
                        fullWidth
                        id="country"
                        label="Country"
                        autoFocus
                        defaultValue={profile.country}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="zipcode"
                        name="zipcode"
                        variant="outlined"
                        fullWidth
                        id="zipcode"
                        label="Zipcode"
                        autoFocus
                        defaultValue={profile.zipcode}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="phone"
                        name="phone"
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="Phone"
                        autoFocus
                        defaultValue={profile.phone}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        required
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        defaultValue={profile.user.password}
                        onChange={this.handleInputChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSubmit}
                >
                    Update
                </Button>
                </form>
            </div>
            </Container>
        </React.Fragment>
        )
    }
  }
}
export default withStyles(styles)(Profile)
