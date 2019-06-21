import React, {Component} from "react";
import {HashRouter} from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Util/PrivateRoute";
import Issues from "./Components/Issues";
import "bootstrap/dist/css/bootstrap.css"
import {withCookies} from 'react-cookie';
import LoginRoute from "./Util/LoginRoute";


class App extends Component {
    render() {
        return (
            <HashRouter>
                <div className="content">
                    <LoginRoute path="/login" cookies={this.props.cookies} component={Login}/>
                    <PrivateRoute path="/issues" cookies={this.props.cookies} component={Issues}/>
                </div>
            </HashRouter>
        );
    }
}

export default withCookies(App);
