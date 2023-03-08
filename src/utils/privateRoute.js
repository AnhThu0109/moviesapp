import React from 'react';
import { Route,  useNavigate } from "react-router-dom";

const PrivateRoute = (props) => {
    const isAuthenticated = localStorage.getItem("session_id"); // Check if user is authenticated
    const navigate = useNavigate();
  
    return (
    //   <Route 
    //   {
    //     isAuthenticated != undefined ? (
    //         key={props.parentIndex} path={props.parentPath} element={props.parentElement}) :(path="/login" element=<Login/></>)
    //   }
    //   />
    // <>
    // {
     
    // path={(props) =>
    //     isAuthenticated != undefined ? (
    //       <Component {...props} />
    //     ) : (
    //       navigate("/login")
    //     )
    //   }
    <></>
    );
  }

export default PrivateRoute;