import React from "react";
import { AuthContext } from "../context/auth";
import {Redirect,Outlet, Navigate} from "react-router-dom";
import { useContext } from "react/cjs/react.development";
const PrivateRoute = ({component: component,...rest}) =>{
    const {user} =useContext(AuthContext);
    return(
        user ? <Outlet/> : <Navigate to="/login"/>
        
    );
}
export default PrivateRoute;