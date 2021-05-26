import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './PrivateRoute';
import TripDetail from './containers/TripDetail'

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/dashboard/trip/:id' component={TripDetail} />
        </Switch>
    </Router>
);
export default App;





