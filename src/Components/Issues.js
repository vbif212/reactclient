import React, {Component} from "react";
import {Switch} from "react-router-dom";
import PrivateRoute from "../CustomRoutes/PrivateRoute";
import IssuesList from "./IssuesList";
import Issue from "./Issue";


class Issues extends Component {

    handleLogoutClick = event => {
        this.props.cookies.remove("access_token");
        this.props.history.push('/');
    };

    handleBrandClick = event => {
        this.props.history.push('/issues');
    };

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-brand btn btn-link" onClick={this.handleBrandClick}>Issue Tracker</button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar1">
                        <ul className="navbar-nav mr-auto">
                        </ul>
                        <button className="btn btn-outline-info" onClick={this.handleLogoutClick}>Log out</button>
                    </div>
                </nav>
                <Switch>
                    <PrivateRoute exact path="/issues" cookies={this.props.cookies} component={IssuesList}/>
                    <PrivateRoute path="/issues/:id" cookies={this.props.cookies} component={Issue}/>
                </Switch>
            </div>
        );
    }
}

export default Issues;
