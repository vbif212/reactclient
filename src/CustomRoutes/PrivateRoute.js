import {Redirect, Route} from "react-router-dom";
import React from "react";

const PrivateRoute = ({component: Component, cookies, ...rest}) => (
    <Route {...rest} render={(props) => (
        cookies.get("access_token")
            ? <Component cookies={cookies} {...props} />
            : <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
    )}/>
);

export default PrivateRoute;
