import React, { useState, useEffect } from 'react'
import {Route, useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const history = useHistory();

  // Add your own authentication on the below line.
  useEffect(() => {
      async function validateToken() {
        const token = localStorage.getItem('token') 
        const response = await fetch('http://localhost:8000/trips/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + token,
            },
        });
        if (response.ok) {
          setLoggedIn(true);
          return
        }
        history.push('/login')
    }
    validateToken();
  }, [isLoggedIn, history]);
  return <Route {...rest} render={(props) => <Component {...props} />} />
}
export default PrivateRoute
