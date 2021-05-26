import React from 'react'
import { Container, Grid, TableBody, TableHead } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import { withStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const styles = (theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    minWidth: 180,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
})

class TripDetail extends React.Component {
  state = {
    trip: {},
    trips: [],
    suggestions: [],
    start_date: '',
    end_date: '',
    trip_plan: '',
    isLoadedTrip: false,
    isLoadedSuggestion: false,
    isVoteError: false,
  }

  componentDidMount() {
    const { id } = this.props.match.params
    fetch('http://127.0.0.1:8000/trips/' + id)
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR')
        }
        return response.json()
      })
      .then((data) => {
        this.setState({
          trip: data,
          isLoadedTrip: true,
        })
      })
    fetch(
      'http://127.0.0.1:8000/suggestions/?' +
        new URLSearchParams({
          trip_plan: id,
        })
    )
      .then((response) => {
        if (!response.ok) {
          throw Error('ERROR')
        }
        return response.json()
      })
      .then((data) => {
        this.setState({
          suggestions: data,
          isLoadedSuggestion: true,
        })
      })
    fetch('http://127.0.0.1:8000/trips/')
        .then((response) => {
            if (!response.ok) {
            throw Error('ERROR')
            }
            return response.json()
        })
        .then((data) => {
            this.setState({
            trips: data,
            isLoadedTrip: true,
            })
        })
  }

  handleVoteClick = (event) => {
    event.preventDefault()
    console.log(event.target)
    console.log(event.currentTarget.value)
    const suggestId = event.currentTarget.value
    const { id } = this.props.match.params
    const token = localStorage.getItem('token')
    this.setState({
      isVoteError: false,
    })
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        suggestions: suggestId,
      }),
    }
    fetch('http://127.0.0.1:8000/vote/', requestOptions)
      .then((response) => {
        if (!response.ok) {
          this.setState({
            isVoteError: true,
          })
        }
        return response.json()
      })
      .then((data) => {
        fetch(
          'http://127.0.0.1:8000/suggestions/?' +
            new URLSearchParams({
              trip_plan: id,
            })
        )
          .then((response) => {
            if (!response.ok) {
              throw Error('ERROR')
            }
            return response.json()
          })
          .then((data) => {
            this.setState({
              suggestions: data,
              isLoadedSuggestion: true,
            })
          })
      })
  }

  handleInputChange = (event) => {
      const target = event.target
      const value = target.value
      const name = target.name
    //   console.log(value)
    //   console.log(name)
      this.setState({
          [name]: value,
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const token = localStorage.getItem('token')
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + token,
        },
        body: JSON.stringify({
          start_date: this.state.start_date,
          end_date: this.state.end_date,
          trip_plan: this.state.trip_plan
        }),
    }
    fetch('http://127.0.0.1:8000/suggestions/', requestOptions)
        .then((response) => {
            if (!response.ok) {
              throw Error('ERROR')
            }
            return response.json()
        })

  }

  render() {
    const { classes } = this.props
    const { id } = this.props.match.params
    const { isLoadedSuggestion, isLoadedTrip, trips, suggestions } = this.state
    return (
      <div>
        {this.state.isVoteError ? (
          <Alert severity="error">Can only vote once!</Alert>
        ) : (
          <div></div>
        )}
        <React.Fragment>
          {isLoadedSuggestion  ? (
            <Container>
              <div>
                <h1>TripDetail {id}</h1>
              </div>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell># of Votes</TableCell>
                    <TableCell>Vote ?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {suggestions.map((suggest) => (
                    <TableRow
                      key={suggest.id}
                      value={suggest.id}
                      className={classes.tableRow}
                    >
                      <TableCell>{suggest.start_date}</TableCell>
                      <TableCell>{suggest.end_date}</TableCell>
                      <TableCell>{suggest.vote.length}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={this.handleVoteClick}
                          key={suggest.id}
                          value={suggest.id}
                        >
                          <ThumbUpIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Container>
          ) : (
            <div>Loading...</div>
          )}
           {isLoadedTrip  ? (
          <Container>
            <div>
              <h1>Create a Suggestion</h1>
            </div>
            <Grid container spacing={1}>
              <form
                className={classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="datetime-local"
                      label="Start Date"
                      name="start_date"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      id="datetime-local"
                      label="End Date"
                      name="end_date"
                      type="datetime-local"
                      defaultValue="2017-05-24T10:30"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={this.handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="demo-simple-select-label">
                        Trip
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue=""
                        name="trip_plan"
                        //   value={age}
                        onChange={this.handleInputChange}
                      >
                        {trips.map((t) => (
                            <MenuItem key={t.id} value={t.id}>
                                <option>{t.destination}</option>
                            </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    // onClick={this.handleSuggestClick}
                  >
                    Create
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Container>
        ) : (
            <div>Loading...</div>
        )}
        </React.Fragment>
      </div>
    )
  }
}
export default withStyles(styles)(TripDetail)
