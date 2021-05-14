import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Dashboard from './containers/Dashboard';
import PrivateRoute from './PrivateRoute';


const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
    </Router>
);
export default App;





