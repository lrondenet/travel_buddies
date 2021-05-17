import React from 'react';
import Table from '@material-ui/core/Table';
import { TableBody, TableHead } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles'


const styles = (theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
});


class Trips extends React.Component {
    state = {
        trips: [],
    }

    preventDefault(event) {
        event.preventDefault();
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/trips/')
            .then(response => {
                if (!response.ok) {
                    throw Error('ERROR');
                }
                return response.json();
            })
            .then(data => {
                this.setState({trips: data})
            })
    }

    render() {
        const { classes } = this.props
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
                        {this.state.trips.map((trip) => (
                            <TableRow key={trip.id}>
                                <TableCell>{trip.id}</TableCell>
                                <TableCell>{trip.destination}</TableCell>
                                <TableCell>{trip.transportation}</TableCell>
                                <TableCell>{trip.stay}</TableCell>
                            </TableRow>
                        ))}                
                    </TableBody>
                </Table>
                <div className={classes.seeMore}>
                    <Link color="primary" href="#" onClick={this.preventDefault}>
                        See more trips
                    </Link>
                </div>
            </React.Fragment>
        )
    }
}
export default withStyles(styles)(Trips);