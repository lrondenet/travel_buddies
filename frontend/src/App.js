import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './PrivateRoute';
import Trips from './containers/Trips';


const App = () => (
    <Router>
        <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/trips' component={Trips} />
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
    </Router>
);
export default App;





