import React from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from './isLogin';

const PrivateRoute = ({Component}) => {
    const result = isLogin();
    return result? <Component />: <Navigate to="/login"/>;
};

export default PrivateRoute;