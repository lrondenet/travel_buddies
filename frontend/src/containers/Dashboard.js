import React from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import Trips from './Trips'
import Profile from './Profile'
import { withRouter } from 'react-router-dom'

const drawerWidth = 240

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
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

class Dashboard extends React.Component {
  state = {
    setOpen: true,
    open: true,
    currentPage: 'trips',
  }

  handleDrawerOpen = () => {
    this.setState({ setOpen: this.state.open })
  }

  handleDrawerClose = () => {
    this.setState({ setOpen: !this.state.setOpen })
  }

  handleLogout = (event) => {
    const { history } = this.props
    event.preventDefault()
    localStorage.removeItem('user_id')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    history.push('/login')
  }

  handleListItemClick = (event) =>{
    event.preventDefault()
    // console.log(event)
    const id = event.target.innerHTML
    console.log('ListItem clicked!', id)
    this.setState({currentPage: id.toLowerCase()})
  }

  render() {
    const { classes } = this.props
    const { setOpen, currentPage } = this.state
    let pageItem;
    if (currentPage == 'profile') {
      pageItem = <Profile />
    }
    else if (currentPage == 'trips') {
      pageItem = <Trips />
    }
    else {
      pageItem = <Profile />
    }
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, setOpen && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                setOpen && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <Button variant="contained" onClick={this.handleLogout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(
              classes.drawerPaper,
              !setOpen && classes.drawerPaperClose
            ),
          }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div>
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" onClick={this.handleListItemClick} id="Profile"/>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <CardTravelIcon />
              </ListItemIcon>
              <ListItemText primary="Trips" onClick={this.handleListItemClick} id="Trips"/>
            </ListItem>
          </div>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    {/* Display Trips Here */}
                    {/* <Trips /> */}
                    {pageItem}
                  </Paper>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} md={8} lg={9}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Profile />
                  </Paper>
                </Grid>
              </Grid> */}
            </Grid>
          </Container>
        </main>
      </div>
    )
  }
}
export default withRouter(withStyles(styles)(Dashboard))
