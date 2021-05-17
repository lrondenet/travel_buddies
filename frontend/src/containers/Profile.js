
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import React from 'react';
import Avatar from '@material-ui/core/Avatar'
// import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

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
  });

class Profile extends React.Component {
    state = {
        users: [],
    }

    componentDidMount() {
        const user_id = localStorage.getItem('user_id')
        fetch('http://localhost:8000/users/' + user_id)
        .then(response => {
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            this.setState({ users: [data]})
            console.log(data)
        })
    }
    render () {
        const { classes } = this.props
        return (
            <React.Fragment>
                <div>
                    {this.state.users.map((user, index) => (
                        <div key={index}>{user.username}</div>
                    ))}
                </div>
            </React.Fragment>
            // <Container component="main" maxWidth="xs">
            //      <CssBaseline />
            //      <div className={classes.paper}>
            //          <Avatar className={classes.avatar}>
            //              <PersonIcon />
            //         </Avatar>
            //         <Typography component="h1" variant="h5">
            //             Profile
            //         </Typography>
            //      </div>
            //      <form
            //      className={classes.form}
            //      noValidate>
            //     <Grid container spacing={2}>                    
                 
                    // <TextField
                    // id="standard-read-only-input"
                    // fullWidth
                    // defaultValue="hi"
                    // InputProps={{readOnly: true}}
                    // >
                    // </TextField>
                    // </Grid> 
                
            //     </Grid>
            //     </form>
            // </Container>
        )
    }
}
export default withStyles(styles)(Profile)