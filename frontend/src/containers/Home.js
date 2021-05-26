import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import Image from '../media/bg.png'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${Image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    Button1: {
        marginRight: theme.spacing(2),
        backgroundColor: '#2cb4a9'
    },
    Button2: {
        backgroundColor: '#2cb4a9'
    },
    title: {
        flexGrow: 1,
    },
    AppBar: {
        backgroundColor: '#386575',
    }
})


class Home extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="static" className={classes.AppBar}>
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                 Travel Buddies
                </Typography>
                <Button color="inherit" className={classes.Button1} href="/login">Login</Button>
                <Button color="inherit" className={classes.Button2} href="/signup">Signup</Button>
                </Toolbar>
                </AppBar>
            </div>
        )
    }
}
export default withStyles(styles)(Home);