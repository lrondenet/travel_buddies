import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isLoggedIn, setLoggedIn] = useState(false)
  // Add your own authentication on the below line.
  
  //   const isLoggedIn = token !== null;

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('LAUREN')
    let mounted = true
    fetch('http://localhost:8000/trips/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
    }).then((resp) => {
      console.log(isLoggedIn)
      console.log(resp)
      console.log(mounted)
      if (resp.ok) {
        if (mounted) {
          setLoggedIn(true)
          console.log('setting state', isLoggedIn)
        }
      }
    })
    // return () => {
    //   mounted = false
    // }
  }, [isLoggedIn])

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
