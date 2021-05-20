import React from 'react'
import Table from '@material-ui/core/Table'
import { TableBody, TableHead } from '@material-ui/core'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'


const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  seeMore: {
    marginTop: theme.spacing(3),
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'yellow !important',
    },
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
})

class Trips extends React.Component {
  state = {
    trips: [],
    isLoaded: false,
  }

  componentDidMount() {
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
          isLoaded: true,
        })
      })
  }

  handleRowClick = (event) => {
    event.preventDefault()
    const parent = event.target.parentElement
    console.log(parent)
    console.log(parent.getAttribute('value'))
    const id = parent.getAttribute('value')
    this.props.history.push('/dashboard/trip/' + id)
  }

  render() {
    const { classes } = this.props
    const { trips, isLoaded } = this.state
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <React.Fragment>
          <h2>Trips</h2>
                  <Table size="medium">
                    <TableHead>
                      <TableRow>
                        <TableCell>Trip #</TableCell>
                        <TableCell>Destination</TableCell>
                        <TableCell>Transportation</TableCell>
                        <TableCell>Stay</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trips.map((trip) => (
                        <TableRow
                          key={trip.id}
                          value={trip.id}
                          className={classes.tableRow}
                          onClick={this.handleRowClick}
                        >
                          <TableCell>{trip.id}</TableCell>
                          <TableCell>{trip.destination}</TableCell>
                          <TableCell>{trip.transportation}</TableCell>
                          <TableCell>{trip.stay}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
        </React.Fragment>
      )
    }
  }
}
export default withRouter(withStyles(styles)(Trips))
