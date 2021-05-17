import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor:  '#00bcd4',
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
  });

class CreateTrips extends React.Component {

    state = {
        destination: '',
        transportation: '',
        stay: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    destination: this.state.destination,
                    transportation: this.state.transportation,
                    stay: this.state.stay 
                }
            )
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

    render() {
        const { classes } = this.props
        return (
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
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Transportation</InputLabel>
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
                            <option>Plane</option>
                            <option>Car</option>
                            <option>Train</option>
                            <option>Boat</option>
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel htmlFor="outlined-age-native-simple">Stay</InputLabel>
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
                            <option>Hotel</option>
                            <option>Hostel</option>
                            <option>Airbnb</option>
                            <option>Camping</option>
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
                <Grid container justify="flex-end">
                </Grid>
              </form>
            </div>
          </Container>
        )
    }
}
export default withStyles(styles)(CreateTrips)
