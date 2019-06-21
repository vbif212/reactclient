import React, {Component} from "react";
import {Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "../css/Login.css";
import Service from "../Service";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            service: new Service()
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        this.state.service
            .obtainAccessToken(this.state.login, this.state.password)
            .then((response) => {
                this.props.cookies.set('access_token', response.data.access_token);
                this.props.history.push('/issues');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="login">
                        <FormLabel>Login</FormLabel>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.login}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
