
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonIcon from '@material-ui/icons/Person';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import { useHistory } from 'react-router-dom'
// import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';




// export const mainListItems = (
//     <div>
//       <ListItem button>
//         <ListItemIcon>
//           <DashboardIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <PersonIcon />
//         </ListItemIcon>
//         <ListItemText primary="Profile" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <CardTravelIcon />
//         </ListItemIcon>
//         <ListItemText primary="Trips" />
//       </ListItem>
//     </div>
//   );


export default function ListItems() {
  const history = useHistory();
  return (
    <React.Fragment>
      <div>
        <ListItem button onClick={() => history.push('/dashboard')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
            <ListItemText primary="Profile" />
            </ListItem>
        <ListItem button>
        <ListItemIcon>
          <CardTravelIcon/>
          </ListItemIcon>
          <ListItemText primary="Trips" />
        </ListItem>
      </div>
    </React.Fragment>
  )
}