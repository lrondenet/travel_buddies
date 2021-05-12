import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Home from './containers/home';
import Signup from './containers/signup';
import Login from './containers/login';
// import Dashboard from './containers/dashboard';


const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
        </Switch>
    </Router>
);
export default App;





    // <Provider store={store}>
    //     <Router>
    //         <Layout>
    //             <Route exact path='/' component={Home} />
    //             <Route exact path='/register' component={Register} />
    //             <Route exact path='/login' component={Login} />
    //             <Route exact path='/dashboard' component={Dashboard} />
    //         </Layout>
    //     </Router>
    // </Provider>


