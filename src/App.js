import React, {Component} from "react";
import {HashRouter, Switch} from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./CustomRoutes/PrivateRoute";
import Issues from "./Components/Issues";
import "bootstrap/dist/css/bootstrap.css"
import {withCookies} from 'react-cookie';
import LoginRoute from "./CustomRoutes/LoginRoute";


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <LoginRoute exact path="/" cookies={this.props.cookies} component={Login}/>
                    <PrivateRoute path="/issues" cookies={this.props.cookies} component={Issues}/>
                </Switch>
            </HashRouter>
        );
    }
}

export default withCookies(App);
