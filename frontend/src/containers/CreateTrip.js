import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#00bcd4',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 180,
  },
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

class CreateTrips extends React.Component {
  state = {
    destination: '',
    transportation: '',
    stay: '',
    users: [],
    personName: [],
    isLoaded: false,
  }

  componentDidMount() {
    fetch('http://127.0.0.1:8000/users/')
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR')
        }
        return response.json()
      })
      .then((data) => {
        // console.log(data)
        this.setState({
          users: data,
          isLoaded: true,
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const requestOptions = {
      method: 'POST',
      headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token
     },
      body: JSON.stringify({
        destination: this.state.destination,
        transportation: this.state.transportation,
        stay: this.state.stay,
        user: this.state.personName
      }),
    }
    fetch('http://localhost:8000/trips/', requestOptions).then((response) => {
      response.json()
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    console.log(value)
    console.log(name)

    this.setState({
      [name]: value,
    })
  }

  handleSelectChange = (event) => {
    this.setState({
      ...this.state,
      personName: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { users, isLoaded, personName } = this.state
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <AirplanemodeActiveIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create a Trip
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="destination"
                      label="Destination"
                      name="destination"
                      autoComplete="destination"
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Transportation
                      </InputLabel>
                      <Select
                        native
                        value={this.state.transportation}
                        onChange={this.handleInputChange}
                        label="Transportation"
                        inputProps={{
                          name: 'transportation',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option>PLANE</option>
                        <option>CAR</option>
                        <option>TRAIN</option>
                        <option>BOAT</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Stay
                      </InputLabel>
                      <Select
                        native
                        value={this.state.stay}
                        onChange={this.handleInputChange}
                        label="Stay"
                        inputProps={{
                          name: 'stay',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option>HOTEL</option>
                        <option>HOSTEL</option>
                        <option>AIRBNB</option>
                        <option>CAMPING</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-mutiple-checkbox-label"
                        id="demo-mutiple-checkbox"
                        multiple
                        fullWidth
                        value={this.state.personName}
                        onChange={this.handleSelectChange}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {users.map((u) => (
                          <MenuItem key={u.user_id} value={u.user_id}>
                            <Checkbox
                              checked={personName.indexOf(u.user_id) > -1}
                            />
                            <ListItemText primary={u.user.username} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}

                >
                  Create
                </Button>
                <Grid container justify="flex-end"></Grid>
              </form>
            </div>
          </Container>
        </React.Fragment>
      )
    }
  }
}
export default withStyles(styles)(CreateTrips)
